import { useState } from 'react';
import { ActionFunctionArgs } from '@remix-run/node';
import { Link, json, useFetcher, useLoaderData } from '@remix-run/react';

import { prisma } from '../db.server';

interface FetcherResponse {
    targetUrl: string;
    vanity: string;
    vanityUrl: string;
}

const BASE_URL = `https://smol.co`;

// Regex explained: https://regexr.com/5c55v
const regex = /([0-9]+|([A-Z][a-z]+)|[a-z]+|([A-Z]+)(?![a-z]))/g;

const kebabCase = (str: string): string =>
    (String(str ?? '').match(regex) || [])
        .map((x) => x.toLowerCase())
        .join('-');

export async function loader() {
    const links = await prisma.smolLink.findMany();

    return json({
        links
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const targetUrl = String(formData.get('targetUrl'));
    const vanity = kebabCase(String(formData.get('vanityUrl')));
    const vanityUrl = `${BASE_URL}/${kebabCase(vanity)}`;

    const newLink = await prisma.smolLink.create({
        data: {
            targetUrl,
            vanity,
            vanityUrl
        }
    });

    return json(newLink);
}

export default function Index() {
    const { links } = useLoaderData<typeof loader>();
    const urlFetcher = useFetcher<FetcherResponse>();
    const [vanity, setVanity] = useState('The world is your oyster');

    return (
        <main className="container">
            <h1>Smol Links 🤏🏻</h1>

            <div className="grid">
                <div>
                    <h2>Links</h2>
                    {links.length > 0 ? (
                        <ul>
                            {links.map((link) => (
                                <li key={link.id}>
                                    <Link to={`/${link.vanity}`}>
                                        {link.vanityUrl}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No links...</p>
                    )}
                </div>
                <div>
                    <h2>Create</h2>
                    <urlFetcher.Form method="post">
                        <label htmlFor="targetUrl">URL</label>
                        <input
                            id="targetUrl"
                            name="targetUrl"
                            defaultValue="http://www.coolstuff.com/zW9FJG7D/my-really-long-url/3791a126"
                        />

                        <label htmlFor="vanity">Vanity</label>
                        <input
                            id="vanity"
                            name="vanityUrl"
                            onChange={(event) => {
                                setVanity(String(event.currentTarget.value));
                            }}
                            value={vanity}
                        />
                        <small>
                            {`Shareable URL example: ${BASE_URL}/${kebabCase(
                                vanity
                            )}`}
                        </small>

                        <button type="submit">Add URL</button>
                    </urlFetcher.Form>

                    {urlFetcher.data?.vanityUrl && (
                        <>
                            <p style={{ marginBottom: '0.5rem' }}>Output</p>
                            <pre>
                                <code>{urlFetcher.data?.vanityUrl}</code>
                            </pre>
                        </>
                    )}

                    {urlFetcher.data && (
                        <>
                            <p style={{ marginBottom: '0.5rem' }}>
                                JSON Response
                            </p>
                            <pre>
                                <code>
                                    {urlFetcher.data
                                        ? JSON.stringify(
                                              urlFetcher.data,
                                              null,
                                              4
                                          )
                                        : 'Click "Add URL" to see result'}
                                </code>
                            </pre>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

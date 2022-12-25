import { Session } from "@inrupt/solid-client-authn-node";
type Note = {
	title: string;
	content: string;
	created: string;
	tags: string[];
};

export default class Repro {
	async login() {
		const session = new Session();
		await session.login({
			// 2. Use the authenticated credentials to log in the session.
			clientId: "", // <-- Your client ID
			clientSecret: "", // <-- Your client secret
			oidcIssuer: "https://login.inrupt.com",
		});
		console.log("are we logged in?", session.info.isLoggedIn);
		if (session.info.isLoggedIn) {
			// 3. Your session should now be logged in, and able to make authenticated requests.
			const response = await session.fetch(session.info.webId || "https://solidcommunity.net/profile/card#me");
			console.log(await response.text());
		}
	}

	// private extractTags(note: Note): string[] {
	// 	const tags = note.content.match(/#(\w+)/g);
	// 	if (tags) {
	// 		return tags.map((tag) => tag.replace("#", ""));
	// 	}
	// 	return [];
	// }
	// async createNoteDatasetURL(noteTitle: string): Promise<string> {
	// 	const mypods: UrlString[] = await getPodUrlAll(getDefaultSession().info.webId!!, {
	// 		fetch: fetch as unknown as ((input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) & ((input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>),
	// 	});
	// 	if (mypods.length > 0) {
	// 		const storageRoot = mypods[0] as string;
	// 		const notesDatasetURL = `${storageRoot}notes/${noteTitle}`;
	// 		console.log(notesDatasetURL);
	// 		return notesDatasetURL;
	// 	} else {
	// 		throw new Error("No pod found");
	// 	}
	// 	return "https://example.com";
	// }

	// async uploadToPod(note: Note) {
	// 	let notesDataset = createSolidDataset();
	// 	const slug = slugify(note.title);
	// 	const noteThing = buildThing(createThing({ name: slug }))
	// 		.addUrl("http://www.w3.org/1999/02/22-rdf-syntax-ns#/type", "http://schema.org/NoteDigitalDocument")
	// 		.addStringNoLocale("http://schema.org/headline", note.title)
	// 		.addDatetime("http://schema.org/dateCreated", new Date(note.created))
	// 		.addStringNoLocale("http://schema.org/keywords", this.extractTags(note).join(","))
	// 		.addStringNoLocale("http://schema.org/text", note.content)
	// 		.build();
	// 	notesDataset = setThing(notesDataset, noteThing);
	// 	const notesDatasetURL = await this.createNoteDatasetURL(slug);
	// 	notesDataset = await saveSolidDatasetAt(
	// 		notesDatasetURL,
	// 		notesDataset,
	// 		{ fetch: fetch } // fetch from authenticated Session
	// 	);
	// 	console.log(notesDataset);
	// 	console.log("notesDatasetURL", notesDatasetURL);
	// }
}

const repro = new Repro();
repro.login();
// repro.login().then(() => {
// 	repro.uploadToPod({
// 		title: "Test",
// 		content: "Test",
// 		created: "2021-01-01",
// 		tags: ["test"],
// 	});
// });

import { Heading, Page } from "./helpers";

export default function Codepen(userName: string, userId: number) {
    return (
        <Page>
            <Heading className="text-2xl">
                I am a headline made with HTML for #{userId}: <strong>{userName}</strong>
            </Heading>
            <p className="text-red-600">And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p>
            <button type="button" className="bg-blue-600 text-white italic px-6 py-2">
                Hide the text above?
            </button>
        </Page>
    );
}

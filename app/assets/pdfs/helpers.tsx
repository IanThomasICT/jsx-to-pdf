export const ElementWithTailwind = (children: React.ReactNode) => (
    <>
        <script src="https://cdn.tailwindcss.com" />
        {children}
    </>
);

export const Page = ({ children }: { children: React.ReactNode }) => <div className="mx-auto bg-white aspect-[8.5/11] h-screen space-y-2 border px-8 py-6 text-xs tracking-tight">{children}</div>;

export const Heading = ({ className, children }: { className?: string; children: React.ReactNode }) => <h2 className={`${className} text-base`}>{children}</h2>;

export const Spacer = () => <div className="grow" />;

// @ts-ignore
export const joinString = (...strings) => strings.filter((s) => s).join(", ");

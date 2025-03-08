import FontInfo from "./components/font-info";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-sans text-sm">
        <h1 className="mb-8 text-4xl font-bold">Font Showcase</h1>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Sans-Serif Font</h2>
          <div className="space-y-4">
            <p className="text-lg">
              This paragraph uses our primary sans-serif font. Notice the clean, readable
              characters.
            </p>
            <p className="text-base">
              The quick brown fox jumps over the lazy dog. 0123456789 !@#$%^&*()_+-=[]{}
              |;&apos;:&quot;,./?
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="font-normal">Normal weight</span>
              <span className="font-medium">Medium weight</span>
              <span className="font-semibold">Semibold weight</span>
              <span className="font-bold">Bold weight</span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Monospace Font</h2>
          <div className="space-y-4">
            <p className="font-code text-lg">
              This paragraph uses our monospace font. Great for code.
            </p>
            <pre className="rounded-md bg-gray-100 p-4 font-code dark:bg-gray-800">
              <code>{`function greet() {
  console.log("Hello, world!");
  return 42;
}`}</code>
            </pre>
            <div className="flex flex-wrap gap-4 font-code">
              <span className="font-normal">Normal weight</span>
              <span className="font-medium">Medium weight</span>
              <span className="font-bold">Bold weight</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Typography Utilities</h2>
          <div className="space-y-4">
            <p className="font-heading text-xl">This heading uses our font-heading utility class</p>
            <p className="font-code">This text uses our font-code utility class for monospace</p>
          </div>
        </section>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            To change fonts, edit the <code className="font-code">lib/fonts.ts</code> file and
            update the <code className="font-code">activeSans</code> and{" "}
            <code className="font-code">activeMono</code> exports.
          </p>
        </div>
      </div>

      <FontInfo />
    </main>
  );
}

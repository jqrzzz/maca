import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.12em] text-clay-600 uppercase">
        404
      </p>
      <h1 className="text-h1 mt-3">This page wandered off the path</h1>
      <p className="text-lede mt-4 max-w-md text-stone">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to solid ground.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary">
          Back home
        </Button>
        <Button href="/give" variant="outline">
          Ways to give
        </Button>
      </div>
    </Container>
  );
}

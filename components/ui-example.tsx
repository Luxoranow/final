import { Button } from "./ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Button Variants</h2>
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      
      <h2 className="text-2xl font-bold mt-6">Button Sizes</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🔍</Button>
      </div>
    </div>
  );
} 
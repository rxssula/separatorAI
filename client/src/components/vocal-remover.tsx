import Upload from "./upload";
import { VocalRemoverStems } from "./vocal-remover-stems";

export function VocalRemover() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center bg-background">
        <div className="w-full py-12 md:py-16">
          <Upload
            title="Vocal Remover"
            description="Upload your audio file and let our AI remove the vocals."
          />
          <VocalRemoverStems />
        </div>
      </div>
    </div>
  );
}

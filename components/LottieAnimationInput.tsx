import { useEffect, useRef, useState } from "react";
import { Card, Stack, Text } from "@sanity/ui";
import { ObjectInputProps, useFormValue, useClient } from "sanity";
import type { AnimationItem } from "lottie-web";

export function LottieAnimationInput(props: ObjectInputProps) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const config = client.config();
  const projectId = config.projectId || "";
  const dataset = config.dataset || "";
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [lottie, setLottie] = useState<any>(null);

  const lottieFile = useFormValue(["lottieFile"]) as any;
  const loop = useFormValue(["loop"]) as boolean;
  const autoplay = useFormValue(["autoplay"]) as boolean;
  const speed = useFormValue(["speed"]) as number;

  // Dynamically import lottie-web only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("lottie-web").then((module) => {
        setLottie(module.default);
      });
    }
  }, []);

  useEffect(() => {
    if (lottieFile?.asset?._ref && projectId && dataset) {
      // Fetch the Lottie JSON from Sanity
      const fetchLottie = async () => {
        try {
          const assetId = lottieFile.asset._ref
            .replace("file-", "")
            .replace("-json", "");
          const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.json`;
          const response = await fetch(url);
          const data = await response.json();
          setAnimationData(data);
        } catch (err) {
          console.error("Error loading Lottie:", err);
        }
      };
      fetchLottie();
    }
  }, [lottieFile?.asset?._ref, projectId, dataset]);

  useEffect(() => {
    // Add lottie to the dependency check
    if (animationData && containerRef.current && lottie) {
      // Clean up previous animation
      animationRef.current?.destroy();

      // Load new animation
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: loop ?? true,
        autoplay: autoplay ?? true,
        animationData: animationData,
      });
      animationRef.current = anim;

      if (speed) {
        anim.setSpeed(speed);
      }
    }

    return () => {
      animationRef.current?.destroy();
    };
  }, [animationData, loop, autoplay, speed, lottie]); // Add lottie to dependencies

  return (
    <Stack space={3}>
      {props.renderDefault(props)}

      {animationData && lottie && (
        <Card padding={4} radius={2} shadow={1} tone="transparent">
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Preview:
            </Text>
            <div
              ref={containerRef}
              style={{
                maxWidth: "400px",
                margin: "0 auto",
              }}
            />
          </Stack>
        </Card>
      )}

      {animationData && !lottie && (
        <Card padding={3} radius={2} tone="caution">
          <Text size={1}>Loading animation preview...</Text>
        </Card>
      )}
    </Stack>
  );
}

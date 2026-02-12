import { useEffect, useRef, useState } from "react";
import { Card, Stack, Text, Flex, Box } from "@sanity/ui";
import type { AnimationItem } from "lottie-web";
import { PlayIcon } from "@sanity/icons";

interface LottieAnimationPreviewProps {
  lottieFile?: { asset?: { _ref?: string } };
  alt?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export function LottieAnimationPreview(
  props: LottieAnimationPreviewProps | { value?: LottieAnimationPreviewProps }
) {
  const resolved = ("value" in props ? props.value : props) as
    | LottieAnimationPreviewProps
    | undefined;
  const { lottieFile, alt, loop, autoplay, speed } = resolved || {};
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lottie, setLottie] = useState<any>(null);

  // Dynamically import lottie-web only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("lottie-web").then((module) => {
        setLottie(module.default);
      });
    }
  }, []);

  useEffect(() => {
    const loadAnimation = async () => {
      if (!lottieFile?.asset?._ref || !lottie) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Clean up previous animation
        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }

        // Extract asset ID from reference
        const assetId = lottieFile.asset._ref
          .replace("file-", "")
          .replace("-json", "");

        const projectId = "g7xcllro";
        const dataset = "eric-production";

        const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.json`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to load Lottie file: ${response.statusText}`);
        }

        const animationData = await response.json();

        if (!containerRef.current) {
          setLoading(false);
          return;
        }

        // Load animation
        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: loop ?? true,
          autoplay: autoplay ?? true,
          animationData: animationData,
        });

        if (speed) {
          animationRef.current?.setSpeed(speed);
        }

        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [lottieFile?.asset?._ref, loop, autoplay, speed, lottie]);

  return (
    <Card padding={3} tone="primary">
      <Stack space={3}>
        <Flex align="center" gap={2}>
          <PlayIcon />
          <Text size={1} weight="semibold">
            Lottie Animation
          </Text>
          {alt && (
            <Text size={1} muted>
              • {alt}
            </Text>
          )}
        </Flex>

        {!lottieFile?.asset?._ref && (
          <Text size={1} muted align="center">
            Add a Lottie JSON file
          </Text>
        )}

        {loading && lottieFile?.asset?._ref && (
          <Text size={1} muted align="center">
            Loading animation...
          </Text>
        )}

        {error && (
          <Text size={1} style={{ color: "red" }} align="center">
            Error: {error}
          </Text>
        )}

        <Box
          ref={containerRef}
          style={{
            width: "100%",
            maxWidth: "400px",
            minHeight: "200px",
            margin: "0 auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display:
              loading || error || !lottieFile?.asset?._ref ? "none" : "block",
          }}
        />
      </Stack>
    </Card>
  );
}

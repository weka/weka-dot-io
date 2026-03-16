import { Flex, Text, Card, Box } from "@sanity/ui";
import { PlayIcon } from "@sanity/icons";
import { useEffect, useState } from "react";

interface WistiaPreviewProps {
  videoId?: string;
}

export function WistiaPreview(
  props: WistiaPreviewProps | { value?: WistiaPreviewProps }
) {
  const resolved = ("value" in props ? props.value : props) as
    | WistiaPreviewProps
    | undefined;
  const { videoId } = resolved || {};
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId || typeof videoId !== "string") {
      setLoading(false);
      return;
    }

    // Fetch thumbnail from Wistia's oEmbed API
    fetch(
      `https://fast.wistia.com/oembed?url=https://home.wistia.com/medias/${videoId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.thumbnail_url) {
          setThumbnailUrl(data.thumbnail_url);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [videoId]);

  if (!videoId || typeof videoId !== "string") {
    return (
      <Card padding={3}>
        <Flex align="center" justify="center" gap={2}>
          <PlayIcon />
          <Text size={1} muted>
            Add a Wistia Video ID
          </Text>
        </Flex>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card padding={3}>
        <Flex align="center" justify="center" gap={2}>
          <Text size={1} muted>
            Loading preview...
          </Text>
        </Flex>
      </Card>
    );
  }

  if (!thumbnailUrl) {
    return (
      <Card padding={3}>
        <Flex align="center" justify="center" gap={2}>
          <PlayIcon />
          <Text size={1}>Wistia Video: {videoId}</Text>
        </Flex>
      </Card>
    );
  }

  return (
    <Card padding={3}>
      <Box
        style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}
      >
        <img
          src={thumbnailUrl}
          alt={`Wistia video ${videoId}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.6)",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayIcon style={{ fontSize: "32px", color: "white" }} />
        </Box>
      </Box>
      <Box paddingTop={2}>
        <Text size={1} muted>
          Video ID: {videoId}
        </Text>
      </Box>
    </Card>
  );
}

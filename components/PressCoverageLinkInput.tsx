import { useCallback, useEffect } from 'react';
import { ObjectInputProps, set, useFormValue } from 'sanity';

/**
 * Custom input component for pressCoverage link field
 * Auto-populates ariaLabel based on title and publication
 */
export function PressCoverageLinkInput(props: ObjectInputProps) {
  const { value, onChange, renderDefault } = props;

  // Watch title and publication fields from parent document
  const title = useFormValue(['title']) as string | undefined;
  const publication = useFormValue(['publication']) as string | undefined;

  // Auto-generate ariaLabel when title or publication changes
  useEffect(() => {
    if (title) {
      const generatedLabel = publication
        ? `Read ${publication} article: ${title}`
        : `Read article: ${title}`;

      // Always update ariaLabel to match current title and publication
      // This keeps it in sync as the user types
      onChange(set(generatedLabel, ['ariaLabel']));
    }
  }, [title, publication, onChange]);

  // Render the default object input
  return renderDefault(props);
}

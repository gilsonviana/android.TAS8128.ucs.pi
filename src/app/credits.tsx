import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CreditRow } from '@/components/credit-row';
import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { ProjectInfo, TeamMembers } from '@/constants/credits';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function CreditsScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="subtitle">Créditos</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
            {ProjectInfo.game}
          </ThemedText>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.projectCard}>
          <ThemedText type="smallBold">{ProjectInfo.course}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {ProjectInfo.institution}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.sectionLabel}>
            Equipe
          </ThemedText>
          {TeamMembers.map((member) => (
            <CreditRow key={member.name} {...member} />
          ))}
        </ThemedView>

        <ExternalLink href={ProjectInfo.repositoryUrl}>
          <ThemedText type="linkPrimary">Repositório no GitHub</ThemedText>
        </ExternalLink>

        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
    gap: Spacing.five,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  centerText: {
    textAlign: 'center',
  },
  projectCard: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.four,
  },
  section: {
    alignSelf: 'stretch',
    gap: Spacing.two,
  },
  sectionLabel: {
    textTransform: 'uppercase',
    marginBottom: Spacing.one,
  },
});

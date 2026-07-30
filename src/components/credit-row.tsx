import { StyleSheet, View } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';
import type { TeamMember } from '@/constants/credits';

/**
 * Exibe um integrante da equipe (avatar com inicial, nome e papel).
 * Quando o integrante possui usuário do GitHub, o nome vira um link.
 */
export function CreditRow({ name, role, github }: TeamMember) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <ThemedView type="backgroundElement" style={styles.row}>
      <ThemedView type="backgroundSelected" style={styles.avatar}>
        <ThemedText type="smallBold">{initial}</ThemedText>
      </ThemedView>

      <View style={styles.info}>
        {github ? (
          <ExternalLink href={`https://github.com/${github}`}>
            <ThemedText type="linkPrimary">{name}</ThemedText>
          </ExternalLink>
        ) : (
          <ThemedText type="smallBold">{name}</ThemedText>
        )}
        <ThemedText type="small" themeColor="textSecondary">
          {role}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: Spacing.half,
  },
});

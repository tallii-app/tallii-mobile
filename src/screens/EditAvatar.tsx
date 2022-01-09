import React from 'react';
import emoji from 'emoji-datasource';
import chunk from 'lodash.chunk';

import {SafeAreaView, ScrollView} from 'react-native';

import {Avatar, Box, Pressable, Row, Column, Heading, Button, Text, Icon} from '../design-system';
import {theme} from '../design-system/theme';

import {Header} from '../components';

/** ----------------------------------------------------------
 * cateogories
 * -----------------------------------------------------------*/
const categories = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Activities',
  'Travel & Places',
  'Objects',
  'Symbols',
  'Flags',
];

/** ----------------------------------------------------------
 * parse unicode emoji
 * -----------------------------------------------------------*/
const parseUnicode = (utf16: string) => {
  // @ts-ignore
  return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
};

/** ----------------------------------------------------------
 * Color Bubble
 * -----------------------------------------------------------*/
interface ColorBubbleProps {
  backgroundColor: string;
  isSelected: boolean;
  onPress: () => void;
}

const ColorBubble: React.FunctionComponent<ColorBubbleProps> = ({
  backgroundColor,
  isSelected = false,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Column
        style={{position: 'relative'}}
        verticalAlign="center"
        horizontalAlign="center"
        gap="none"
      >
        {isSelected && (
          <Box
            borderRadius="round"
            borderWidth="large"
            borderColor="secondary"
            style={{height: 36, width: 36, position: 'absolute'}}
          />
        )}
        <Box style={{height: 20, width: 20, backgroundColor}} borderRadius="round" />
      </Column>
    </Pressable>
  );
};

/** ----------------------------------------------------------
 * Edit Avatar Screen
 * -----------------------------------------------------------*/
interface EditAvatarProps {
  onSave: (emoji: string, backgroundColor: string) => void;
  defaultBackgroundColor: string;
  defaultEmoji: string;
}

export const EditAvatar: React.FunctionComponent<EditAvatarProps> = ({
  onSave,
  defaultBackgroundColor = 'accentOrangeSecondary',
  defaultEmoji,
}) => {
  // init the current category
  const [currentCategory, setCurrentCategory] = React.useState('Smileys & Emotion');

  // init the current backgroundColor
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    React.useState(defaultBackgroundColor);

  // init current emoji
  const [currentEmoji, setCurrentEmoji] = React.useState(defaultEmoji);

  // group the emojis by category
  const allEmojis = React.useMemo(() => {
    let emojis: {[key: string]: string[]} = {};

    for (const emo of emoji) {
      const uni = parseUnicode(emo.unified);
      const category = emo.category;

      if (emo.category in emojis) {
        emojis[category] = [...emojis[category], uni];
      } else {
        emojis[category] = [uni];
      }
    }
    return emojis;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header.Root horizontalAlign="right">
        <Header.Exit />
      </Header.Root>
      <Column padding="default" gap="large">
        <Row horizontalAlign="center">
          <Avatar.Root size="large" backgroundColor={currentBackgroundColor}>
            <Avatar.Emoji>{currentEmoji}</Avatar.Emoji>
          </Avatar.Root>
        </Row>
        <Row horizontalAlign="center" gap="medium">
          {Object.entries(theme.colors.background.accent).map(([key, value]) => {
            return (
              <ColorBubble
                key={key}
                backgroundColor={value.secondary}
                isSelected={currentBackgroundColor === value.secondary}
                onPress={() => setCurrentBackgroundColor(value.secondary)}
              />
            );
          })}
        </Row>
        <Column
          backgroundColor="widgetSecondary"
          borderRadius="large"
          padding="default"
          gap="small"
          style={{height: 300}}
        >
          <ScrollView style={{height: 300}}>
            <Column gap="small" horizontalAlign="center">
              {chunk(allEmojis[currentCategory], 8).map((emoRow: string[], i) => {
                return (
                  <Row
                    key={i}
                    verticalAlign="top"
                    horizontalAlign="left"
                    gap="default"
                    style={{flexWrap: 'wrap'}}
                  >
                    {emoRow.map((emo: string, j) => {
                      return (
                        <Pressable key={j} onPress={() => setCurrentEmoji(emo)}>
                          <Heading>{emo}</Heading>
                        </Pressable>
                      );
                    })}
                  </Row>
                );
              })}
            </Column>
          </ScrollView>
          <Box
            backgroundColor="widgetTertiary"
            paddingHorizontal="xsmall"
            style={{width: '100%', height: 36}}
            borderRadius="round"
          >
            <ScrollView horizontal>
              <Row horizontalAlign="center" verticalAlign="center" gap="small">
                {categories.map((c: string, i) => {
                  const isSelected = currentCategory === c;
                  return (
                    <Pressable key={i} onPress={() => setCurrentCategory(c)}>
                      <Box
                        borderRadius="round"
                        paddingHorizontal="small"
                        paddingVertical="xsmall"
                        backgroundColor={isSelected ? 'widgetAction' : undefined}
                      >
                        <Text styledAs="caption" textColor={isSelected ? 'onAction' : undefined}>
                          {c}
                        </Text>
                      </Box>
                    </Pressable>
                  );
                })}
              </Row>
            </ScrollView>
          </Box>
        </Column>
        <Button.Root>
          <Button.Text>save</Button.Text>
        </Button.Root>
      </Column>
    </SafeAreaView>
  );
};
import type { AppConfig } from './types';

const config: AppConfig = {
  friends: [
    { name: '爷爷' },
    { name: '大哥' },
    { name: '约翰' },
  ],
  birthdayName: '九十',
  birthdayDate: '2026-09-05',
  birthdayMessage: '生日快乐。\n无论今晚是什么天气，我们都在这里。',

  characters: [
    {
      name: '爷爷',
      lines: [
        '九十，我就在这里哦。',
        '火别让它灭了，我看着呢。',
        '想说什么都可以，不急的。',
      ],
    },
    {
      name: '大哥',
      lines: [
        '九十！看这边看这边～',
        '你先坐嘛，反正我们又不走。',
        '今晚的星星还挺多的。',
      ],
    },
    {
      name: '九十',
      lines: [
        '我想哭。',
        '我很害怕。',
        '我好孤独。',
        '我脑子停不下来。',
        '我也不知道自己怎么了。',
        '……谢谢你们。',
        '篝火还挺暖的。',
      ],
    },
    {
      name: '约翰',
      lines: [
        '九十，嗯，我在。',
        '话可以慢慢说，我听得见。',
        '你来了就好。',
      ],
    },
  ],

  scenes: [
    {
      id: 'cry',
      title: '我想哭',
      objectType: 'album',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'crying',
      title: '我正在大哭',
      objectType: 'projector',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'angry',
      title: '我很生气',
      objectType: 'plaque',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'afraid',
      title: '我很害怕',
      objectType: 'radio',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'hopeless',
      title: '我没有希望',
      objectType: 'friends',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'lonely',
      title: '我好孤独',
      objectType: 'album',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'hug',
      title: '我好想有人抱抱我',
      objectType: 'hug',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'talk',
      title: '我只是想找个人说话',
      objectType: 'radio',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'nothing',
      title: '我什么都不想做',
      objectType: 'fire',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'why',
      title: '为什么他会那么做',
      objectType: 'plaque',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'decide',
      title: '我现在特别想做一个决定',
      objectType: 'box',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'racing',
      title: '我脑子停不下来',
      objectType: 'radio',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'awful',
      title: '我觉得自己很糟糕',
      objectType: 'friends',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'nothing-have',
      title: '我觉得自己什么都没有',
      objectType: 'album',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
    {
      id: 'unknown',
      title: '我也不知道自己怎么了',
      objectType: 'simple',
      friends: [
        { name: '爷爷', contents: [] },
        { name: '大哥', contents: [] },
        { name: '约翰', contents: [] },
      ],
    },
  ],

  birthdaySurprise: {
    photos: [],
    videos: [],
    audios: [],
    message: '我们其实还有一些话想告诉你。',
  },
};

export default config;

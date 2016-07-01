import parseTags from '../../src/utils/parse-tags';

describe('Tag parser', () => {

  it('parses tags from text', () => {
    expect(parseTags('this #string contain #awesome tags')).toEqual([
      'string',
      'awesome',
    ]);

    expect(parseTags('#tag1 #Tag2 #tag3.')).toEqual(['tag1', 'tag2', 'tag3']);
    expect(parseTags('hello #world #world')).toEqual(['world']);
    expect(parseTags('no tags')).toEqual([]);
  });

  it('normalizes tags', () => {
    expect(parseTags('#Stoner #stoner #stOner')).toEqual(['stoner']);
    expect(parseTags('#Stoner_rock #stonerRock')).toEqual(['stonerRock']);
    expect(parseTags('#tag_2007')).toEqual(['tag2007']);
  });

});

import { CursorData } from './cursor-data.type';

export class Cursor {
  public static toString(data: CursorData): string {
    const stringed = Cursor.serialize(data);
    console.log('string send to toString', data, 'string converted', stringed);
    return stringed;
  }

  public static toData(stringData: string): null | CursorData {
    try {
      const data = JSON.parse(Cursor.deserialize(stringData));
      console.log(
        'string send to toData',
        stringData,
        'string converted to data',
        data
      );
      return data;
    } catch (error) {
      console.log('from cursor toData method', error);
      return error;
    }
  }

  protected static serialize(data: CursorData): string {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  protected static deserialize(stringData: string): string {
    return Buffer.from(stringData, 'base64').toString('utf-8');
  }
}

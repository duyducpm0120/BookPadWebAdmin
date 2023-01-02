import { safeGetBoolean, safeGetNumber } from '@core/utils';

export class RatingModel {
  BookReviewId: number;

  BookReviewScore: number;

  BookReviewComment: string;

  IsDeleted: boolean;

  CreatedAt: Date;

  UpdatedAt: Date;

  OwnerId: number;

  BookId: number;

  IsHidden: boolean;

  constructor(
    BookReviewId: number,
    BookReviewScore: number,
    BookReviewComment: string,
    IsDeleted: boolean,
    CreatedAt: Date,
    UpdatedAt: Date,
    OwnerId: number,
    BookId: number,
    IsHidden: boolean
  ) {
    this.BookReviewId = BookReviewId;
    this.BookReviewScore = BookReviewScore;
    this.BookReviewComment = BookReviewComment;
    this.IsDeleted = IsDeleted;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
    this.OwnerId = OwnerId;
    this.BookId = BookId;
    this.IsHidden = IsHidden;
  }

  public static instantiate = (json: any) => {
    const BookReviewId = safeGetNumber(json, 'BookReviewId', 0);
    const BookReviewScore = safeGetNumber(json, 'BookReviewScore', 0);
    const { BookReviewComment } = json;
    const { IsDeleted } = json;
    const { CreatedAt } = json;
    const { UpdatedAt } = json;
    const OwnerId = safeGetNumber(json, 'OwnerId', 0);
    const BookId = safeGetNumber(json, 'BookId', 0);
    const IsHidden = safeGetBoolean(json, 'IsHidden', false);

    return new RatingModel(
      BookReviewId,
      BookReviewScore,
      BookReviewComment,
      IsDeleted,
      CreatedAt,
      UpdatedAt,
      OwnerId,
      BookId,
      IsHidden
    );
  };

  public static instantiateList = (json: any) => {
    const returnData: RatingModel[] = [];
    json.forEach((element: any) => {
      returnData.push(RatingModel.instantiate(element));
    });
    return returnData;
  };
}

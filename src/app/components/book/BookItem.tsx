import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import type { BookItemProps } from './BookItem.types';
import { useStyles } from './BookItem.style';
import { SPACE } from '@core';
import { size } from 'lodash';
export const BookItem = (props: BookItemProps): JSX.Element => {
  const { bookData } = props;
  const styles = useStyles();
  return (
    <Card className={styles.wrapper}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={bookData.BookCoverImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            variant="h5"
            minHeight={SPACE.spacing44}
            lineHeight={1.2}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2
            }}>
            {bookData.BookName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {size(bookData.Authors) > 0 ? bookData.Authors[0].AuthorName : 'Random author'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

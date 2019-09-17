import Grid from '@material-ui/core/Grid';
import Modal from '../../_modal/Modal';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormUtil, { Fields } from '../../../utils/FormUtil';
import update from 'immutability-helper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Skeleton from '@material-ui/lab/Skeleton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import UploadImageMutation from '../../UploadImageMutation';
import FormHelperText from '@material-ui/core/FormHelperText';
import RemovableImage from '../../RemovableImage';
import Image from '../../Image';
import AddIcon from '@material-ui/icons/Add';
import StarRating from '../../_rating/StarRating';
import DefaultImage from '../../../image/default-image.jpg';
import { useUserOrderDetailQuery } from '../../../graphql/query/UserOrderDetailQuery';
import { IUserOrderDetailFragmentModalAddUserOrderDetailComment } from '../../../graphql/fragment/interface/UserOrderDetailFragmentInterface';
import { userOrderDetailFragments } from '../../../graphql/fragment/query/UserOrderDetailFragment';
import { useAddUserOrderDetailCommentMutation } from '../../../graphql/mutation/userOrderDetailMutation/AddUserOrderDetailCommentMutation';
import { addUserOrderDetailCommentMutationFragments } from '../../../graphql/fragment/mutation/AddUserOrderDetailCommentMutationFragment';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface IProps {
  userOrderDetailId: string;
  isOpen: boolean;
  toggle: () => void;
}

const useStyles = makeStyles({
  productImage: {
    height: '100px',
    width: '140px'
  },
  commentImage: {
    height: '100px',
    width: '140px'
  },
  inputUpload: {
    display: 'none'
  },
  content: {
    margin: 0
  }
});

export default function ModalAddUserOrderDetailComment(props: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  let addUserOrderDetailCommentFields = [
    {
      field: 'comment',
      isCheckEmpty: true,
      emptyMessage: t('please enter comment'),
      value: ''
    },
    {
      field: 'star',
      isCheckEmpty: true,
      emptyMessage: t('please rate your star'),
      value: 0
    },
    {
      field: 'uploadedImages',
      value: []
    }
  ];
  const [addUserOrderDetailComment, setAddUserOrderDetailComment] = useState<
    Fields
  >(FormUtil.generateFieldsState(addUserOrderDetailCommentFields));
  const [uploadingImageCount, setUploadingImageCount] = useState<number>(0);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState<boolean>(false);

  let { toggle, isOpen, userOrderDetailId } = props;

  const { data } = useUserOrderDetailQuery<
    IUserOrderDetailFragmentModalAddUserOrderDetailComment
  >(userOrderDetailFragments.ModalAddUserOrderDetailComment, {
    fetchPolicy: 'no-cache',
    variables: {
      id: userOrderDetailId
    }
  });

  let userOrderDetail: IUserOrderDetailFragmentModalAddUserOrderDetailComment | null = null;

  if (data) {
    userOrderDetail = data.userOrderDetail.items[0];
  }

  const [
    addUserOrderDetailCommentMutation,
    { loading: isAddingUserOrderDetailCommentMutation }
  ] = useAddUserOrderDetailCommentMutation(
    addUserOrderDetailCommentMutationFragments.ModalAddUserOrderDetailComment,
    {
      onCompleted: () => {
        enqueueSnackbar(t('rate product successfully'));
        handleOkCloseDialog();
      },
      onError: async () => {
        await checkAddUserOrderDetailCommentForm();
      }
    }
  );

  async function checkAddUserOrderDetailCommentForm(error?: any) {
    let {
      state: checkedEmptyState,
      isValid: emptyIsValid
    } = FormUtil.generateFieldsEmptyErrorHook(
      addUserOrderDetailCommentFields,
      addUserOrderDetailComment
    );

    let {
      state: checkedErrorState,
      isValid: validationIsValid
    } = FormUtil.validationErrorHandlerHook(
      addUserOrderDetailCommentFields,
      error,
      checkedEmptyState
    );

    if (addUserOrderDetailComment.star.value === 0) {
      checkedErrorState = update(checkedErrorState, {
        addUserOrderDetailComment: {
          star: {
            feedback: { $set: t('please rate star') },
            is_valid: { $set: false }
          }
        }
      });
    }

    setAddUserOrderDetailComment(checkedErrorState);

    return (
      emptyIsValid && validationIsValid && !(await isCommentImageUploading())
    );
  }

  function isCommentImageUploading() {
    if (uploadingImageCount > 0) {
      enqueueSnackbar(t('please wait until the upload image complete'));
      return true;
    }
    return false;
  }

  async function onClickAddUserOrderDetailComment() {
    if (await checkAddUserOrderDetailCommentForm()) {
      addUserOrderDetailCommentMutation({
        variables: {
          userOrderDetailId: userOrderDetailId,
          comment: addUserOrderDetailComment.comment.value,
          star: addUserOrderDetailComment.star.value,
          commentImages: addUserOrderDetailComment.uploadedImages.value.map(
            (uploadedImage: any) => uploadedImage.path
          )
        }
      });
    }
  }

  function handleCancelCloseDialog() {
    setIsCloseDialogOpen(false);
  }

  function handleOkCloseDialog() {
    setIsCloseDialogOpen(false);
    toggle();
  }

  function toggleCloseDialog() {
    setIsCloseDialogOpen(true);
  }

  function uploadProductImage(images: any, uploadImageMutation: any) {
    if (images.length > 0) {
      setUploadingImageCount(uploadingImageCount + images.length);
      Array.prototype.forEach.call(images, (image: any) => {
        uploadImageMutation({
          variables: {
            images: [image]
          }
        });
      });
    }
  }

  function uploadProductImageCompletedHandler(data: any) {
    let tempImageData = data.uploadImageMutation;
    setUploadingImageCount(uploadingImageCount - tempImageData.length);

    setAddUserOrderDetailComment(
      update(addUserOrderDetailComment, {
        uploadedImages: { value: { $push: [tempImageData[0]] } }
      })
    );
  }

  function uploadProductImageErrorHandler(error: any) {
    setUploadingImageCount(uploadingImageCount - 1);

    let errorMessage = FormUtil.getValidationErrorByField('images.0', error);
    enqueueSnackbar(errorMessage, {
      variant: 'error'
    });
  }

  function removeUploadedProductImage(removeUploadedImage: any) {
    let removingIndex = addUserOrderDetailComment.uploadedImages.value.findIndex(
      (uploadedImage: any) => {
        return removeUploadedImage.id === uploadedImage.id;
      }
    );

    setAddUserOrderDetailComment(
      update(addUserOrderDetailComment, {
        uploadedImages: { value: { $splice: [[removingIndex, 1]] } }
      })
    );
  }

  let productImageUrl: string =
    userOrderDetail &&
    userOrderDetail.product &&
    userOrderDetail.product.product_image.length
      ? userOrderDetail.product.product_image[0].image_medium
      : DefaultImage;

  return (
    <>
      <Dialog
        maxWidth="sm"
        open={isCloseDialogOpen}
        onClose={handleCancelCloseDialog}
      >
        <DialogTitle>{t('cancel rate product')}</DialogTitle>
        <DialogContent>{t('are you sure cancel rate product?')}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCloseDialog} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleOkCloseDialog} color="primary">
            {t('ok')}
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={isOpen}
        onClose={toggleCloseDialog}
        fullWidth
        maxWidth={'md'}
      >
        <Grid
          container
          direction="row"
          item
          xs={12}
          spacing={2}
          className={classes.content}
        >
          {userOrderDetail ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" color="inherit">
                  {t('rate product')}
                </Typography>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid item>
                  <Image
                    className={classes.productImage}
                    useLazyLoad
                    alt={userOrderDetail.product_title}
                    src={productImageUrl}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" display="inline">
                    {userOrderDetail.product_title}
                  </Typography>
                  <Typography variant="subtitle2">
                    {t('variation')}: {userOrderDetail.product_type_title}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Typography variant="subtitle1">{t('star count')}</Typography>
              </Grid>
              <Grid container item xs={12} justify={'center'}>
                <FormControl margin="none">
                  <StarRating
                    size={'large'}
                    value={addUserOrderDetailComment.star.value}
                    onChange={(event: React.ChangeEvent<{}>, value: number) => {
                      setAddUserOrderDetailComment(
                        update(addUserOrderDetailComment, {
                          star: {
                            value: { $set: value }
                          }
                        })
                      );
                    }}
                  />
                  {addUserOrderDetailComment.star.feedback && (
                    <FormHelperText error>
                      {addUserOrderDetailComment.star.feedback}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={addUserOrderDetailComment.comment.value}
                  error={!addUserOrderDetailComment.comment.is_valid}
                  label={t('your comment')}
                  value={addUserOrderDetailComment.comment.value}
                  onChange={(e: { target: { value: any } }) => {
                    setAddUserOrderDetailComment(
                      update(addUserOrderDetailComment, {
                        comment: {
                          value: { $set: e.target.value }
                        }
                      })
                    );
                  }}
                  helperText={addUserOrderDetailComment.comment.feedback}
                  margin="normal"
                  disabled={addUserOrderDetailComment.comment.disabled}
                  fullWidth
                  multiline
                  rows={5}
                  rowsMax={6}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal">
                  <UploadImageMutation
                    onCompleted={uploadProductImageCompletedHandler}
                    onError={uploadProductImageErrorHandler}
                    uploadImage={uploadProductImage}
                    multiple
                    id={'uploadCommentImage'}
                    className={classes.inputUpload}
                  />
                  <label htmlFor="uploadCommentImage">
                    <Button
                      variant="outlined"
                      color="primary"
                      component={'span'}
                    >
                      <AddIcon fontSize={'small'} color="primary" />
                      {t('image')}
                    </Button>
                  </label>
                  {addUserOrderDetailComment.uploadedImages.feedback && (
                    <FormHelperText error>
                      {addUserOrderDetailComment.uploadedImages.feedback}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid container item spacing={1} xs={12}>
                {addUserOrderDetailComment.uploadedImages.value.map(
                  (uploadedImage: any) => (
                    <Grid
                      key={uploadedImage.id}
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={3}
                    >
                      <RemovableImage
                        className={classes.commentImage}
                        remove={() => {
                          removeUploadedProductImage(uploadedImage);
                        }}
                        src={uploadedImage.image_medium}
                      />
                    </Grid>
                  )
                )}

                {new Array(uploadingImageCount).fill(6).map(ele => {
                  return (
                    <Grid key={ele} item xs={12} sm={6} md={6} lg={4}>
                      <Skeleton variant={'rect'} height={150} />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container item justify="flex-end" xs={12} spacing={1}>
                <Grid item>
                  <Button onClick={toggleCloseDialog} color="primary">
                    {t('cancel')}
                  </Button>
                </Grid>
                <Grid item>
                  {isAddingUserOrderDetailCommentMutation ? (
                    <Button disabled variant="contained" color="primary">
                      {t('submitting...')}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        onClickAddUserOrderDetailComment();
                      }}
                    >
                      {t('submit')}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </>
          ) : (
            <React.Fragment>
              {new Array(4).fill(6).map((ele, index) => {
                return (
                  <Grid key={index} item xs={12}>
                    <Skeleton variant={'rect'} height={50} />
                  </Grid>
                );
              })}
            </React.Fragment>
          )}
        </Grid>
      </Modal>
    </>
  );
}

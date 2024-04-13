// Product.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { addToCart, removeFromCart } from "./redux/actions/cartActions";
import {
  saveProduct,
  removeProduct,
  updateProductSaveCount,
} from "./redux/actions/productAction";
import Message from "./Message";
import Loader from "./Loader";
import ProductPrice from "./ProductPrice";
import PromoTimer from "./PromoTimer";
import Rating from "./Rating";
import styles from "./ProductStyles";

function Product({ product }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const qty = route.params?.qty || 1;

  const [addToCartMessage, setAddToCartMessage] = useState(false);
  const [removeFromCartMessage, setRemoveFromCartMessage] = useState(false);
  const [productSaved, setProductSaved] = useState(false);
  const [totalSaves, setTotalSaves] = useState(product.save_count);

  const [productMessages, setProductMessages] = useState({
    productSaveSuccess: false,
    productRemoveSuccess: false,
    productSaveError: null,
    productRemoveError: null,
  });

  const [productLoading, setProductLoading] = useState({
    productSaveLoading: false,
    productRemoveLoading: false,
  });

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [isCart, setIsCart] = useState(
    cartItems.some((item) => item.product === product._id)
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (
      userInfo &&
      userInfo.favorite_products &&
      userInfo.favorite_products.includes(product._id)
    ) {
      setProductSaved(true);
    } else {
      setProductSaved(false);
    }
  }, [userInfo, product._id]);

  const toggleCartHandler = () => {
    if (isCart) {
      dispatch(removeFromCart(product._id));
      setIsCart(false);
      setRemoveFromCartMessage(true);
      setTimeout(() => {
        setRemoveFromCartMessage(false);
      }, 3000);
    } else {
      dispatch(addToCart(product._id, qty));
      setIsCart(true);
      setAddToCartMessage(true);
      setTimeout(() => {
        setAddToCartMessage(false);
      }, 3000);
    }
  };

  const toggleFavoriteHandler = () => {
    if (!userInfo) {
      navigation.navigate("Login");
    } else {
      if (productSaved) {
        setProductLoading({ productRemoveLoading: true });
        dispatch(removeProduct(userInfo.id, product._id))
          .then(() => {
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveSuccess: true,
              productSaveSuccess: false,
              productRemoveError: null,
              productSaveError: null,
            }));
            setProductSaved(false);
            setTotalSaves((prevSaves) => prevSaves - 1); // Decrement totalSaves
            // Update product.save_count in the database
            const updatedSaveCount = product.save_count - 1;
            dispatch(updateProductSaveCount(product._id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              productRemoveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productRemoveSuccess: false,
              productSaveSuccess: false,
              productSaveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productRemoveLoading: false });
          });
      } else {
        setProductLoading({ productSaveLoading: true });
        dispatch(saveProduct(userInfo.id, product._id))
          .then(() => {
            // Handle success
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveSuccess: true,
              productRemoveSuccess: false,
              productSaveError: null,
              productRemoveError: null,
            }));
            setProductSaved(true);
            setTotalSaves((prevSaves) => prevSaves + 1); // Increment totalSaves
            // Update product.save_count in the database
            const updatedSaveCount = product.save_count + 1;
            dispatch(updateProductSaveCount(product._id, updatedSaveCount));
          })
          .catch((error) => {
            // Handle error
            setProductMessages((prevState) => ({
              ...prevState,
              productSaveError:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
              productSaveSuccess: false,
              productRemoveSuccess: false,
              productRemoveError: null,
            }));
          })
          .finally(() => {
            setProductLoading({ productSaveLoading: false });
          });
      }
    }
    setTimeout(() => {
      setProductMessages((prevState) => ({
        ...prevState,
        productSaveSuccess: false,
        productRemoveSuccess: false,
      }));
    }, 3000);
  };

  const viewProductHandler = () => {
    navigation.navigate("Product Detail", { id: product._id });
    // navigation.navigate("Product Detail", { productId: product._id });
  };
  console.log("product id:", product.id);

  function formatCount(viewCount) {
    if (viewCount >= 1000000) {
      // Format as million
      return (viewCount / 1000000).toFixed(1) + "m";
    } else if (viewCount >= 1000) {
      // Format as thousand
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount?.toString();
    }
  }

  return (
    <View style={styles.card}>
      {addToCartMessage && (
        <Message variant="success">Item added to cart.</Message>
      )}
      {removeFromCartMessage && (
        <Message variant="danger">Item removed from cart.</Message>
      )}

      {productMessages.productSaveSuccess && (
        <Message variant="success">Item added to favorites.</Message>
      )}
      {productMessages.productRemoveSuccess && (
        <Message variant="danger">Item removed from favorites.</Message>
      )}
      {productMessages.productSaveError && (
        <Message variant="danger">{productMessages.productSaveError}</Message>
      )}
      {productMessages.productRemoveError && (
        <Message variant="danger">{productMessages.productRemoveError}</Message>
      )}

      {productLoading.productSaveLoading && <Loader />}
      {productLoading.productRemoveLoading && <Loader />}

      {/* <TouchableOpacity onPress={viewProductHandler}>
        <Image source={{ uri: product.image }} style={styles.image} /> 
      </TouchableOpacity> */}

      <TouchableOpacity onPress={viewProductHandler}>
        {typeof product.image === "string" ? (
          <Image source={{ uri: product.image }} style={styles.image} />
        ) : (
          <Image source={product.image} style={styles.image} />
        )}
      </TouchableOpacity>

      <View style={styles.body}>
        <TouchableOpacity onPress={viewProductHandler}>
          <Text style={styles.title}>{product.name}</Text>
        </TouchableOpacity>

        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Rating
              value={product.rating}
              text={`${formatCount(product.numReviews)} reviews `}
              color="blue"
            />
          </View>
          {userInfo ? (
            <TouchableOpacity
              onPress={() => history.push(`/review-list/${product._id}`)}
            >
              <Text style={styles.link}>(Verified Ratings)</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => history.push("/login")}>
              <Text style={styles.link}>(Verified Ratings)</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.price}>
          <ProductPrice
            price={product.price}
            promoPrice={product.promo_price}
          />
        </Text>

        {product.promo_code &&
          new Date(product.expiration_date) >= new Date() && (
            <Text style={styles.promo}>
              Promo code "{product.promo_code}" for{" "}
              {product.discount_percentage}% discount expires in:{" "}
              <PromoTimer expirationDate={product.expiration_date} />
            </Text>
          )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={toggleCartHandler}
            style={[styles.button, isCart ? styles.info : styles.outlineInfo]}
            disabled={product.countInStock === 0}
          >
            <Text style={styles.buttonText}>
              {product.countInStock === 0 ? (
                <Text>Out of Stock</Text>
              ) : isCart ? (
                <Text>
                  <FontAwesomeIcon
                    size={24}
                    color="white"
                    icon={faCartArrowDown}
                  />{" "}
                  Remove From Cart
                </Text>
              ) : (
                <Text>
                  <FontAwesomeIcon
                    size={24}
                    color="white"
                    icon={faCartArrowDown}
                  />{" "}
                  Add To Cart
                </Text>
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFavoriteHandler}
            style={[
              styles.button,
              productSaved ? styles.danger : styles.outlineDanger,
            ]}
          >
            <Text style={styles.buttonText}>
              <FontAwesomeIcon
                icon={productSaved ? faHeart : faHeartRegular}
                color="green"
                size={24}
                style={{ marginRight: 2 }}
              />{" "}
              {productSaved ? "Saved" : "Save"}{" "}
              <Text style={styles.textMuted}>({formatCount(totalSaves)})</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Product;

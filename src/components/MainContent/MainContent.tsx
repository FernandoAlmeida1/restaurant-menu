import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MenuSection from "../MenuSection/MenuSection";
import Card from "../Card/Card";
import Cart from "../Cart/Cart";
import CartModal from "../CartModal/CartModal";
import Collapse from "../Collapse/Collapse";
import "./MainContent.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: { id: number; image: string }[];
}

interface SectionItem {
  id: number;
  name: string;
  items: MenuItem[];
}

interface MainContentProps {
  tabValue: number;
  filteredMenu: { sections?: SectionItem[] } | null;
  isMobile: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  tabValue,
  filteredMenu,
  isMobile,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
  const [isBasketButtonVisible, setIsBasketButtonVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setIsBasketButtonVisible(cart.length > 0);
  }, [cart]);

  const handleAddToCart = (
    itemId: number,
    name: string,
    price: number,
    quantity: number
  ) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === itemId);
      let updatedCart;
      if (existingItem) {
        updatedCart = prev.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        updatedCart = [...prev, { id: itemId, name, price, quantity }];
      }
      setIsCartModalOpen(true);
      return updatedCart;
    });
  };

  const handleUpdateCartQuantity = (itemId: number, amount: number) => {
    setCart((prev) => {
      const updatedCart = prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0);
      return updatedCart;
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const sections = [
    {
      name: t("burgers"),
      image:
        "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe4c64a6f.png",
    },
    {
      name: t("drinks"),
      image:
        "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe5dc1bf3.png",
    },
    {
      name: t("desserts"),
      image:
        "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe93cb615.png",
    },
  ];

  const getFilteredSections = (name: string): SectionItem[] => {
    return (
      filteredMenu?.sections?.filter((section) => section.name === name) || []
    );
  };

  const handleCheckout = () => {
    console.log(t("checkout_initiated"));
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleBasketButtonClick = () => {
    setIsCartModalOpen(true);
  };

  const cartItems = cart.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {} as { [key: number]: number });

  return (
    <div className={`main-content-container ${isMobile ? "mobile" : ""}`}>
      {tabValue === 1 && (
        <section>
          <h2>{t("login")}</h2>
        </section>
      )}
      {tabValue === 2 && (
        <section>
          <h2>{t("contact")}</h2>
        </section>
      )}

      {isMobile && (
        <>
          <div className="tabs mobile-tabs">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`tab ${activeTab === index ? "active" : ""}`}
                onClick={() => handleTabChange(index)}
              >
                <img
                  src={section.image}
                  alt={section.name}
                  className="tab-image"
                />
                <div>{section.name}</div>
              </div>
            ))}
          </div>

          <div className="tab-content">
            {getFilteredSections(sections[activeTab].name).map((section) => (
              <MenuSection
                key={section.id}
                name={section.name}
                items={section.items}
                isMobile={isMobile}
                handleAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            ))}
          </div>

          <Collapse title={t("burgers")}>
            {getFilteredSections(t("burgers")).map((section) => (
              <MenuSection
                key={section.id}
                name={section.name}
                items={section.items}
                isMobile={isMobile}
                handleAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            ))}
          </Collapse>

          <Collapse title={t("drinks")}>
            {getFilteredSections(t("drinks")).map((section) => (
              <MenuSection
                key={section.id}
                name={section.name}
                items={section.items}
                isMobile={isMobile}
                handleAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            ))}
          </Collapse>

          <CartModal
            isOpen={isCartModalOpen}
            onClose={handleCloseCartModal}
            cart={cart}
            handleUpdateCartQuantity={handleUpdateCartQuantity}
            calculateSubtotal={calculateSubtotal}
            calculateTotal={calculateTotal}
            onCheckout={handleCheckout}
          />

          {isMobile && (
            <div className="content-button-your-basket">
              <a
                href="#"
                className="allergy-info-link"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("View allergy information clicked");
                }}
              >
                {t("view_allergy_information")}
              </a>

              {isBasketButtonVisible && (
                <button className="basket-button" onClick={handleBasketButtonClick}>
                  {t("your_basket")} • {cart.length} {t("item")}
                </button>
              )}
            </div>
          )}

        </>
      )}

      <div className="card-container-wrapper">
        <div className="card-container">
          <Card
            title=""
            content={
              !isMobile ? (
                <div>
                  <div className="tabs">
                    {sections.map((section, index) => (
                      <div
                        key={index}
                        className={`tab ${activeTab === index ? "active" : ""}`}
                        onClick={() => handleTabChange(index)}
                      >
                        <img
                          src={section.image}
                          alt={section.name}
                          className="tab-image"
                        />
                        <div>{section.name}</div>
                      </div>
                    ))}
                  </div>

                  <div className="tab-content">
                    {getFilteredSections(sections[activeTab].name).map(
                      (section) => (
                        <MenuSection
                          key={section.id}
                          name={section.name}
                          items={section.items}
                          isMobile={isMobile}
                          handleAddToCart={handleAddToCart}
                          cartItems={cartItems}
                        />
                      )
                    )}
                  </div>

                  <Collapse title={t("burgers")}>
                    {getFilteredSections(t("burgers")).map((section) => (
                      <MenuSection
                        key={section.id}
                        items={section.items}
                        isMobile={isMobile}
                        handleAddToCart={handleAddToCart}
                        cartItems={cartItems}
                      />
                    ))}
                  </Collapse>

                  <Collapse title={t("drinks")}>
                    {getFilteredSections(t("drinks")).map((section) => (
                      <MenuSection
                        key={section.id}
                        items={section.items}
                        isMobile={isMobile}
                        handleAddToCart={handleAddToCart}
                        cartItems={cartItems}
                      />
                    ))}
                  </Collapse>
                </div>
              ) : (
                <div className="tab-content">
                  {getFilteredSections(sections[activeTab].name).map(
                    (section) => (
                      <MenuSection
                        key={section.id}
                        name={section.name}
                        items={section.items}
                        isMobile={isMobile}
                        handleAddToCart={handleAddToCart}
                        cartItems={cartItems}
                      />
                    )
                  )}
                </div>
              )
            }
            width={isMobile ? "100%" : "600px"}
            height={isMobile ? "auto" : "auto"}
            opacity={1}
            mobile={isMobile}
          />

          <div className="main-content">
            {!isMobile && (
              <Card
                title={t("cart")}
                content={
                  <Cart
                    cart={cart}
                    handleUpdateCartQuantity={handleUpdateCartQuantity}
                    calculateSubtotal={calculateSubtotal}
                    calculateTotal={calculateTotal}
                  />
                }
                width={isMobile ? "100%" : "320px"}
                height={isMobile ? "auto" : "auto"}
                gap={isMobile ? "0" : "1px"}
                opacity={1}
                mobile={isMobile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

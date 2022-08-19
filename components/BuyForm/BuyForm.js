import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createOrder, sendEmail } from "../../utils/api/order";
import styles from "./BuyForm.module.css";

const BuyForm = ({ value: { showBuyForm, setShowBuyForm } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    createOrder(data)
      .then((o) => {
        if (o && o.data && o.data.id) {
          sendEmail({
            email: data.email,
            message: "Your order has been confirmed !",
          })
            .then((e) => {
              setShowBuyForm(!showBuyForm);
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!showBuyForm) {
      reset();
    }

    // eslint-disable-next-line
  }, [showBuyForm])

  return (
    <>
      <div
        className={`${styles.modal} ${styles.micromodalSlide} ${
          showBuyForm && styles.isOpen
        }`}
        id="modal-1"
        aria-hidden="true"
      >
        <div
          className={styles.modalOverlay}
          tabIndex="-1"
          data-micromodal-close
        >
          <div
            className={styles.modalContainer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-1-title"
          >
            <header className={styles.modalHeader}>
              <h2 className={styles.modalTitle} id="modal-1-title">
                Personal Details
              </h2>
              <button
                className={styles.modalClose}
                aria-label="Close modal"
                data-micromodal-close
                onClick={() => setShowBuyForm(false)}
              ></button>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <main className={styles.modalContent} id="modal-1-content">
                <div className={styles.form}>
                  <div className={styles.grid}>
                    <div className={styles.input}>
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="First Name"
                        {...register("firstName", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors && errors.firstName && (
                        <span className={styles.ErrorMessage}>
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.input}>
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors && errors.lastName && (
                        <span className={styles.ErrorMessage}>
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.input}>
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid Email",
                          },
                        })}
                      />
                      {errors && errors.email && (
                        <span className={styles.ErrorMessage}>
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.input}>
                      <label>Full  Address</label>
                      <input
                        type="text"
                        placeholder="Full Address"
                        {...register("address", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors && errors.address && (
                        <span className={styles.ErrorMessage}>
                          {errors.address.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.input}>
                      <label>Wallet ID</label>
                      <input
                        type="text"
                        placeholder="Wallet ID"
                        {...register("country", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors && errors.country && (
                        <span className={styles.ErrorMessage}>
                          {errors.country.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.input}>
                      <label>Phone Number</label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        {...register("phoneNumber", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          pattern: {
                            value:
                              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                            message: "Please enter a valid Phone Number",
                          },
                        })}
                      />
                      {errors && errors.phoneNumber && (
                        <span className={styles.ErrorMessage}>
                          {errors.phoneNumber.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </main>
              <footer className={styles.modalFooter}>
                <button
                  className={styles.modalBtn}
                  data-micromodal-close
                  aria-label="Close this dialog window"
                  onClick={() => setShowBuyForm(false)}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                >
                  DONE
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyForm;

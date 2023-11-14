import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utilities/customFetch";
import { FormInput, Spinner } from "../components";

export const loader = async ({ request }) => {
  const queryEntriesArr = [...new URL(request.url).searchParams.entries()];
  const { c } = Object.fromEntries(queryEntriesArr);
  try {
    const res = await customFetch.get(`checkout/${c}`);

    return res.data.data.checkoutInfo;
  } catch (error) {
    if (error.response.data.msg === "invalid token") return redirect("/cart");
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await customFetch.post("order", data);

    return redirect("/completed");
  } catch (error) {
    if (error.response.data.msg === "some items are out of stock")
      return redirect("/cart");

    if (error.response.data.msg === "some items are unavailable")
      return redirect("/cart");

    if (error.response.data.msg === "invalid token")
      throw {
        status: error.response.status,
        message: "Checkout over time, please try again.",
      };

    return error.response.data.msg;
  }
};

const Checkout = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData()?.split(",");
  const data = useLoaderData();

  const priceArr = [];

  return (
    <Form
      method="post"
      className="section-container my-40 grid md:grid-cols-2 px-6 gap-10"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl mb-2 font-semibold tracking-widest">
            CONTACT
          </h1>
          <FormInput
            inputError={errors?.includes("invalid email format.")}
            name="email"
            type="email"
            placeHolder="youreamil@email.com"
          />
        </div>
        <div>
          <h1 className="text-2xl mb-2 font-semibold tracking-widest">
            DELIVERY
          </h1>
          <div className="flex gap-1">
            <FormInput
              name="postalCode"
              type="number"
              placeHolder="Postal code"
            />
            <FormInput name="city" type="text" placeHolder="City" />
          </div>
          <FormInput
            name="address"
            type="text"
            placeHolder="Please provide completed address."
          />
        </div>
        <div>
          <h1 className="text-2xl mb-2 font-semibold tracking-widest">
            INFORMATION
          </h1>
          <div className="flex gap-1">
            <FormInput name="lastName" type="text" placeHolder="Last name" />
            <FormInput name="firstName" type="text" placeHolder="First name" />
          </div>
          <FormInput
            inputError={errors?.includes("invalid phone")}
            name="phone"
            type="text"
            max={10}
            placeHolder="Phone"
          />
        </div>
        <div>
          <h1 className="text-2xl mb-2 font-semibold tracking-widest">
            PAYMENT
          </h1>
          <FormInput
            inputError={errors?.includes("invalid card number")}
            name="creditCardNum"
            type="text"
            placeHolder="Credit card number"
            max={14}
          />
          <div className="flex gap-1">
            <FormInput
              inputError={errors?.includes("invalid exp date")}
              name="creditCardExp"
              type="text"
              placeHolder="Expiration date (MMYYYY)"
              max={6}
            />
            <FormInput
              inputError={errors?.includes("invalid security code")}
              name="creditCardSecurityCode"
              type="text"
              placeHolder="Security code"
              max={3}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-brandPrimary rounded-md text-white py-4 ${
            isSubmitting && "opacity-70"
          }`}
        >
          {isSubmitting ? <Spinner /> : "PAY NOW"}
        </button>
      </div>
      <div className="border-t">
        {data.map((c, i) => {
          const { _id, name, photos, price } = c.itemInfo;
          priceArr.push(price);
          return (
            <div
              key={i}
              className="py-2 grid gap-y-4 grid-cols-[auto,1fr,auto,auto] gap-4 border-b"
            >
              <div className="w-[100px]">
                <img
                  src={photos[0]}
                  className="w-fill object-cover aspect-square"
                  alt=""
                />
              </div>
              <div className="tracking-wider uppercase flex flex-col gap-2">
                <p className="font-semibold">{name}</p>
                <div className="space-y-1">
                  <p className="text-textLight">SIZE: {c.sizing}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">X 1</div>
              <div className="flex items-center gap-6 justify-self-end">
                $ {price * 1} USD
              </div>
            </div>
          );
        })}
        <div className="flex flex-col gap-2 items-end pt-10">
          <p className="text-lg">
            SUBTOTAL : $ {priceArr.reduce((acc, curr) => acc + curr, 0)}
            USD
          </p>
          <p className="text-lg">SHIPPING : $ 10 USD</p>
          <p className="mt-2 text-2xl font-bold">
            TOTAL : $ {priceArr.reduce((acc, curr) => acc + curr, 0) + 10} USD
            <input
              type="number"
              name="totalPrice"
              hidden
              readOnly
              value={priceArr.reduce((acc, curr) => acc + curr, 0) + 10}
            />
          </p>

          <p className="text-xs text-textLight">Tax included</p>
        </div>
      </div>
    </Form>
  );
};
export default Checkout;

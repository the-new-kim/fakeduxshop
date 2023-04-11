export const getProductById = async (id: number | string) =>
  await (
    await fetch(`${process.env.FAKESTORE_BASE_URL}/products/${id}`)
  ).json();

export const getProducts = async () =>
  await (await fetch(`${process.env.FAKESTORE_BASE_URL}/products/`)).json();

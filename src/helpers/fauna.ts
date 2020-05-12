import faunadb, { query as q } from "faunadb";

const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY,
});

export const allItemsByIndex = async (
  index: string,
  ...terms: any[]
): Promise<any[]> => {
  const { data } = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index(index), ...terms)),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  );

  return data.map((item) => ({
    id: item.ref.value.id,
    ...item.data,
  }));
};

export const getItemById = async (
  collectionName: string,
  id: string
): Promise<any> => {
  try {
    const { ref, data } = await client.query(
      q.Get(q.Ref(q.Collection(collectionName), id))
    );

    return {
      id: ref.value.id,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createItem = async (
  collectionName: string,
  insertData: any
): Promise<any> => {
  try {
    const { ref, data } = await client.query(
      q.Create(q.Collection(collectionName), {
        data: insertData,
      })
    );

    return {
      id: ref.value.id,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateItem = async (
  collectionName: string,
  id: string,
  dataToUpdate: any
): Promise<any> => {
  try {
    const { ref, data } = await client.query(
      q.Update(q.Ref(q.Collection(collectionName), id), { data: dataToUpdate })
    );

    return {
      id: ref.value.id,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

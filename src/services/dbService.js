import PageDTO from '../dto/pageDto.js';

class DbService {
  static async createItem(item, model) {
    const modelItem = new model(item);
    console.log('MARTIN_LOG=> DbService => createItem => modelItem', modelItem);
    await modelItem.save();

    return modelItem;
  }

  static async updateItem(id, item, model) {
    const result = await model.findByIdAndUpdate(id, item, { new: true });
    return result;
  }

  static async deleteItem(id, model) {
    console.log('MARTIN_LOG=> DbService => deleteItem => id', id);
    const result = await model.findByIdAndDelete(id);
    return result;
  }

  static async getItem(id, model) {
    const result = await model.findById(id).exec();

    return result;
  }

  static async getItems(model, searchParams = {}) {
    try {
      console.log('MARTIN_LOG=> DbService => getItems => searchParams', searchParams);
      const { limit, page, sort, query } = searchParams;

      if (sort && !['asc', 'desc'].includes(sort)) {
        throw new Error('Invalid sort parameter');
      }

      const pages = await model.paginate(
        {
          // status: true,
          category: 'beauty'
        },
        {
          limit: limit || 10,
          page: page || 1,
          sort: sort && {
            price: sort,
          },
        }
      );

      return new PageDTO(pages).get();
    } catch (error) {
      return new PageDTO({ docs: [] }, error).get();
    }
  }
}

export default DbService;

// module.exports = {
//   readDb,
//   writeDb,
//   createItem,
//   getItems,
//   getItem,
//   updateItem,
//   deleteItem,
//   searchItems,
// };

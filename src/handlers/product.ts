import prisma from "../db";

// Get all
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// Get one
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: req.user.id,
    },
    include: {
      updates: false,
    },
  });

  res.json({ data: product });
};

// Create one
export const createProduct = async (req, res, next) => {
  try{
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
  
    res.json({ data: product });
  } catch (e){
    next(e)
  }
};

// Update
export const updateProduct = async (req, res) => {
  // const findProduct = await prisma.product.findFirst({
  //     where: {
  //         id: req.params.id,
  //         belongsToId: req.user.id
  //     }
  // })

  // const updated = await prisma.product.update({
  //     where: {
  //         id: findProduct.id
  //     },
  //     data:{
  //         name: req.body.name
  //     }
  // })

  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

// Delete

export const deleteProduct = async (req, res) => {
  // const findProduct = await prisma.product.findFirst({
  //     where: {
  //         id: req.params.id,
  //         belongsToId: req.user.id
  //     }
  // })

  // const deleted = await prisma.product.delete({
  //     where:{
  //         id: findProduct.id
  //     }
  // })

  // const deleted = await prisma.product.delete({
  //   where: {
  //     id_belongsToId: {

  //     }
  //   }
  // });

  const deleted = await prisma.product.delete({
    where:{
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    }
  })
  res.json({ data: deleted });
};

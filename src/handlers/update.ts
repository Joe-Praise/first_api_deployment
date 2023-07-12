import prisma from "../db";

// get one
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
    // include:{
    //     updatePoints: true
    // }
  });

  res.json({ data: update });
};

// get all
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

// create 
export const createUpdate = async (req, res) => {

  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({ message: "Nope!" });
  }

  const update = await prisma.update.create({
    data: {
        title: req.body.title,
        body: req.body.body,
        product: {connect: {id: product.id}},  
    }
  });

  res.json({ data: update });
};

// update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: "Nope!" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version
    }
  });

  res.json({ data: updatedUpdate });
};

// delete
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: "Nope!" });
  }

  const deleted = await prisma.update.delete({
    where: {
        id: req.params.id
    }
  })

  res.json({data: deleted})
};

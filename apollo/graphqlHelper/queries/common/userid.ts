export default (_parent, _: unknown, _context): any => {
  const { userId } = _parent || {};
  if (!userId) return null;

  const { loaders } = _context;
  console.log(userId, "======================================");
  // return { id: "test", username: "kjsdkf" };
  return loaders.user.load(userId);
};

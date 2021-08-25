export default (_parent, _: unknown, _context): any => {
  const { userId } = _parent || {};
  if (!userId) return null;

  const { loaders } = _context;
  return loaders.user.load(userId);
};

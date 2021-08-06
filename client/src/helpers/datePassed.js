// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const deadlinePassed = (deadline) => {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);

  return currentDate > deadlineDate;
};

export default deadlinePassed;

'use server';

export const testLol = async () => {
  console.log('Server Hello');

  setTimeout(function () {
    console.log('Server timeout');
  }, 2000); // 2000 milliseconds = 2 seconds

  console.log('Server Bye');

  const data: string = 'TESTEMICH';

  return {
    data,
  };
};

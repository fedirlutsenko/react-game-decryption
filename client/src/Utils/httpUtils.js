const parseJSON = (response) => {
    return response.json();
};

const Get = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
            },
            });
        return parseJSON(response);
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.error(error);
    }
};


const Post = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return parseJSON(response);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
    }
  };

export default ({
    Get,
    Post,
});

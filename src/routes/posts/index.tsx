/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useProfileData = routeLoader$(
  async (requestEvent) => {
    //const session = requestEvent.sharedMap.get("session");
    let data;
    //console.log(session);
    //if (session) {
    //const token = session.access_token;
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
        headers: {
          //Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      data = await res.json();
    } catch (e) {
      console.log(e);
    }

    return data;
  }
  //}
);

export default component$(() => {
  const profileData = useProfileData();
  return (
    <>
      <h1>Posts</h1>

      {profileData.value?.map((item: any, index: number) => {
        return (
          <div key={index}>
            <b>{index + 1}</b>
            <p>{item.title}</p>
          </div>
        );
      })}
    </>
  );
});

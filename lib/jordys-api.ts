import { ApiPost, AuthenticationError, Author } from "../interfaces/jordys-api";

export type ItemForUpload = {
  name: string;
  file: Blob | File;
};

type RetrievePostResp = {
  post: ApiPost;
  prevPostId: string;
  nextPostId: string;
};

export class JordysAPI {
  API_URL =
    process.env.NODE_ENV === "production"
      ? "https://api.jordys.site/"
      : `http://localhost:3001/`;

  constructor(dev_ip?) {
    if (process.env.NODE_ENV === "production") return;
    const validIp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(dev_ip);
    if (dev_ip && validIp) {
      this.API_URL = `http://${dev_ip}:3001/`;
    }
    console.log("contructor", this.API_URL);
  }

  async getAuthorInfos(authorIds: string[]): Promise<Author[]> {
    const resp = await fetch(
      this.API_URL + "backend/author?ids=" + authorIds.join(","),
      {
        headers: {
          Authorization:
            "Basic " +
            (process.env.JORDYS_API_KEY
              ? process.env.JORDYS_API_KEY
              : "not-found"),
        },
      }
    );

    if (!resp.ok) {
      console.log("Response not ok");
      throw new Error(JSON.stringify(await resp.text()));
    }

    return await resp.json();
  }

  async register(formData: FormData) {
    // nothing yet b/c i don't want to allow registering from .site yet.
  }

  async login(formData: FormData) {
    const resp = await fetch(this.API_URL + "login", {
      method: "POST",
      body: new URLSearchParams(formData as any),
      credentials: "include",
    });
    if (!resp.ok) {
      console.log("Response from server not OK");
      if (resp.status === 401) {
        throw new AuthenticationError();
      }
      throw new Error(JSON.stringify(await resp.json()));
    }
    return;
  }

  async createPost() {
    const resp = await fetch(this.API_URL + "posts/new", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "---",
        excerpt: "...",
        date: new Date().toISOString().split("T")[0],
        postBody: "# Hello World",
      }),
    });
    if (!resp.ok) {
      console.log("Response from server not OK");
      if (resp.status === 401) {
        throw new AuthenticationError();
      }
      throw new Error(await resp.json());
    }
    return await resp.json();
  }

  async retrieveAllPostsWithToken(): Promise<ApiPost[]> {
    const resp = await fetch(this.API_URL + "backend/posts/all", {
      headers: {
        Authorization:
          "Basic " +
          (process.env.JORDYS_API_KEY
            ? process.env.JORDYS_API_KEY
            : "not-found"),
      },
    });

    if (!resp.ok) {
      console.log("Response from server not OK");
      throw new Error(JSON.stringify(await resp.text()));
    }

    return (await resp.json()) as ApiPost[];
  }

  async retrieveAllPosts() {
    const resp = await fetch(this.API_URL + "posts/all", {
      credentials: "include",
    });

    if (!resp.ok) {
      console.log("Response from server not OK");
      if (resp.status === 401) {
        throw new AuthenticationError();
      }
      throw new Error(JSON.stringify(await resp.json()));
    }

    return (await resp.json()) as ApiPost[];
  }

  async convertHeic(file: File) {
    const formData = new FormData();
    formData.append("heic-file", file);

    const resp = await fetch(this.API_URL + "util/convert-heic", {
      method: "POST",
      credentials: "include",
      headers: {},
      body: formData,
    });

    if (!resp.ok) {
      console.log("Response from server not OK");
      if (resp.status === 401) {
        throw new AuthenticationError();
      }
      throw new Error(JSON.stringify(await resp.json()));
    }

    return await resp.blob();
  }

  async uploadVideoAndCover(id, video: ItemForUpload, cover: Blob) {
    const formData = new FormData();
    formData.append("video_and_cover", video.file, video.name);
    formData.append("video_and_cover", cover, "n/a");

    const resp = await fetch(
      this.API_URL + "posts/gallery-upload-video/" + id,
      {
        method: "POST",
        credentials: "include",
        headers: {},
        body: formData,
      }
    );
    if (!resp.ok) {
      console.log("Response from server not OK");
      throw new Error(await resp.json());
    }
    return await resp.json();
  }

  async removeGalleryItem(id, itemName) {
    const resp = await fetch(
      this.API_URL + "posts/gallery/delete/" + id + "/" + itemName,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!resp.ok) {
      console.log("Response from server not OK");
      if (resp.status === 401) {
        throw new AuthenticationError();
      }
      const respjson = await resp.json();
      throw new Error(JSON.stringify(respjson));
    }
    return await resp.json();
  }

  async uploadImages(id, itemsForUpload: ItemForUpload[]) {
    const formData = new FormData();

    itemsForUpload.forEach((item) => {
      formData.append("images", item.file, item.name);
    });

    const resp = await fetch(this.API_URL + "posts/gallery-upload/" + id, {
      method: "POST",
      credentials: "include",
      headers: {},
      body: formData,
    });
    if (!resp.ok) {
      console.log("Response from server not OK");
      throw new Error(await resp.json());
    }
    return await resp.json();
  }

  async updatePost(id, fields) {
    const resp = await fetch(this.API_URL + "posts/" + id, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    if (!resp.ok) {
      console.log("Response from server not OK");
      if (resp.status === 401) {
        throw new AuthenticationError();
      }
      const respjson = await resp.json();
      throw new Error(JSON.stringify(respjson));
    }
    return await resp.json();
  }

  async retrievePostWithToken(id): Promise<RetrievePostResp> {
    const resp = await fetch(this.API_URL + "backend/posts/" + id, {
      headers: {
        Authorization:
          "Basic " +
          (process.env.JORDYS_API_KEY
            ? process.env.JORDYS_API_KEY
            : "not-found"),
      },
    });

    if (!resp.ok) {
      console.log("Response not ok");
      throw new Error(JSON.stringify(await resp.text()));
    }

    return await resp.json();
  }

  async retrievePost(id): Promise<ApiPost> {
    console.log("retrievePost", this.API_URL);
    const resp = await fetch(this.API_URL + "posts/" + id, {
      credentials: "include",
    });
    if (!resp.ok) {
      console.log("Response not ok");
      if (resp.status === 401) {
        throw new AuthenticationError();
      }
      throw new Error(await resp.json());
    }
    return await resp.json();
  }
}



export interface ICategory {
    id: number;
    Title: string;
    slug: string;
}



export interface IPagination{
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
}

export interface IResourceMeta {
   pagination:IPagination;
}

export interface ICollectionResponse<T> {
    data: T;
    meta: IResourceMeta;
}

export interface IArticle {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    Body: TBodyData;
    cover: IImageData;
    author: IAuthor;
}

export interface IAuthor {
    username: string;
    email: string;
    avatar: {
        url: string;
        formats:{
            thumbnail:{
                url:string
            }
        }
    };
    articles: IArticle[],
}

export type TBodyData = IParagraph[];

export interface IText {
    type: "text";
    text: string;
  }
  
  export interface IParagraph {
    type: "paragraph";
    children: IText[];
  }

  export interface IImageData {
      url: string;
      formats: {
        thumbnail: {
            url: string;
        }
        small:{
            url: string;
        }
      }
  }
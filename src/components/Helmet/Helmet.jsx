import React from "react";

const Helmet = (props) => {
  document.title = "Food ordering app -" + props.title;
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;

/*
todo:[Helmet] :
The Helmet component is used to manage changes to the document head, such as the title and meta tags. Its role includes:

*Dynamic Titles: 
 It allows you to set or update the page title dynamically based on the content or route, improving user experience and SEO.

*Meta Tags:
 You can easily manage other meta tags (like description and keywords) for better search engine optimization.

*Accessibility:
 A clear title helps users understand the context of the page they are on.

!Overall, it enhances your website's usability and search visibility.



*/
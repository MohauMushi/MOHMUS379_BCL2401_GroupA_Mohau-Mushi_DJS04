# DJS04 Project Brief: Book Connect - Web Components

### Objective
Transform the book preview functionality of the "Book Connect" application into a fully operational Web Component. Additionally, evaluate and potentially convert other parts of the application into Web Components to enhance modularity and reusability.

![alt text](image.png)


### Goals
- **Convert Book Preview to Web Component**: The main focus is to encapsulate the book preview feature into a Web Component, making it reusable and independent.
- **Assess Other Components**: Identify other elements within the "Book Connect" app that could benefit from being converted into Web Components.
- **Maintain Functionality**: Ensure that the application retains all its current functionalities after refactoring.

### Tasks
1. **Understand the Existing Codebase**: Familiarize yourself with the current structure and functionality of the "Book Connect" project, focusing on the book preview feature.
2. **Create a Web Component for Book Preview**:
   - Encapsulate the book preview into a Web Component.
   - Ensure that the component is self-contained, with its own HTML, CSS, and JavaScript.
   - Test the component to ensure it works seamlessly within the app.
3. **Identify and Convert Other Components**:
   - Analyse the application to identify other potential components for conversion.
   - Prioritise components based on their reusability and importance to the app.
   - Convert the chosen elements into Web Components.
4. **Testing and Integration**:
   - Rigorously test the new components individually and within the context of the application.
   - Pay special attention to interactions between components and the overall user experience.
5. **Documentation**:
   - Document the process of creating the Web Components.
   - Include any challenges faced and how they were overcome.
   - Provide a clear guide on how the components should be used within the app.

### Discussion and Reflection

**Challenges encountered while converting the book preview and other elements into Web Components**

1.  **Encapsulation**: In this code, the book preview component relies on global variables such as `authors` and `books`, as well as helper functions like `createBookPreview`. So the challenge was setting the attributes in the `createBookPreview` to replace the innerHTML as this was a straggle to know how to set them.

2. **Event Handling**: Handling events in Web Components was complex than in DOM elements, as events need to be propagated through the Shadow DOM boundary.

**Rationale behind selecting certain elements for conversion into Web Components:**

The `BookPreview` component was a good candidate for conversion to a Web Component because it represented a reusable UI element with its own styles, markup, and logic and there was not repetition of the same code in the file. By encapsulating it as a Web Component, it became easier to maintain, reuse, and share across different parts of the file code.

**Insights gained about the advantages and limitations of using Web Components in web development:**

1. **Reusability**: Web Components are easy to be reused across different parts of the code file, promoting code sharing and consistency.

2. **Maintainability**: By separating concerns and encapsulating functionality, Web Components made code easier to maintain and update.

**Learning Curve**: Web Components introduce new concepts such as the Shadow DOM and Custom Elements, which can be confusing  at first, but i have to do revision to learn more.
// type ExperienceSliderNumber = 1 | 2 | 3;

// const buttonSlideOne = document.getElementById("slide-1");
// const buttonSlideTwo = document.getElementById("slide-2");
// const buttonSlideThree = document.getElementById("slide-3");

// const slideOne = document.querySelector(".translate-x-0");
// const slideTwo = document.querySelector(".translate-x-[200vw]");
// const slideThree = document.querySelector(".translate-x-[100vw]");

// if (buttonSlideOne && buttonSlideTwo && buttonSlideThree) {
//   buttonSlideOne.addEventListener("click", () => {
//     // Logic to handle the slide transition
//     slideOne?.classList.add("translate-x-0");
//     slideTwo?.classList.remove("translate-x-0");
//     slideThree?.classList.remove("translate-x-0");
//   });

//   buttonSlideTwo.addEventListener("click", () => {
//     // Logic to handle the slide transition
//     slideOne?.classList.remove("translate-x-0");
//     slideTwo?.classList.add("translate-x-0");
//     slideThree?.classList.remove("translate-x-0");
//   });

//   buttonSlideThree.addEventListener("click", () => {
//     // Logic to handle the slide transition
//     slideOne?.classList.remove("translate-x-0");
//     slideTwo?.classList.remove("translate-x-0");
//     slideThree?.classList.add("translate-x-0");
//   });
// }
// export function handleSlideChange(slide: ExperienceSliderNumber) {
//   return 1;
// }

// handle section scrolling

// export function handleDomContentLoad() {
//   // Select the elements in the array
//   const elements = Array.from(document.querySelectorAll("section"));

//   // Create a new Intersection Observer
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const windowWidth = window.innerWidth;
//       if (windowWidth <= 1024) {
//         enableScrolling();
//       } else {
//         handleIntersection(entry);
//       }
//     });
//   });

//   function handleIntersection(entry: IntersectionObserverEntry) {
//     if (entry.isIntersecting && entry.intersectionRatio === 1) {
//       enableScrolling();
//     } else {
//       disableScrolling();
//     }
//   }

//   function enableScrolling() {
//     document.body.style.overflowY = "auto";
//   }

//   function disableScrolling() {
//     if (!window.onwheel) {
//       document.body.style.overflowY = "hidden";
//     }
//   }

//   function handleWindowResize() {
//     const windowWidth = window.innerWidth;
//     if (windowWidth <= 1024) {
//       enableScrolling();
//       window.removeEventListener("wheel", debouncedScroll);
//     } else {
//       disableScrolling();
//       window.addEventListener("wheel", debouncedScroll);
//     }
//   }

//   window.addEventListener("resize", handleWindowResize);

//   // Start observing each element in the array
//   elements.forEach((element) => {
//     observer.observe(element);
//   });

//   // Scroll to the next element in the array on scroll down
//   let currentIndex = 0;
//   let isScrolling = false;

//   function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (isScrolling) return;

//     if (event.deltaY > 0) {
//       currentIndex = Math.min(currentIndex + 1, elements.length - 1);
//     } else {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     elements[currentIndex].scrollIntoView({ behavior: "smooth" });

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);
//   }

//   const debouncedScroll = debounce(handleScroll, 200);
//   window.addEventListener("wheel", debouncedScroll);
// }

// refector version

// js version
export function initializeScrollHandling() {
  const elements = Array.from(document.querySelectorAll("section"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 1024) {
        enableScrolling();
      } else {
        handleIntersection(entry);
      }
    });
  });

  function handleIntersection(entry) {
    if (entry.isIntersecting && entry.intersectionRatio === 1) {
      enableScrolling();
    } else {
      disableScrolling();
    }
  }

  function enableScrolling() {
    document.body.style.overflowY = "auto";
  }

  function disableScrolling() {
    if (!window.onwheel) {
      document.body.style.overflowY = "hidden";
    }
  }

  function handleWindowResize() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1024) {
      enableScrolling();
      window.removeEventListener("wheel", debouncedScroll);
    } else {
      disableScrolling();
      window.addEventListener("wheel", debouncedScroll);
    }
  }

  window.addEventListener("resize", handleWindowResize);

  elements.forEach((element) => {
    observer.observe(element);
  });

  let currentIndex = 0;
  let isScrolling = false;

  function debounce(func, wait) {
    let timeout;

    return function (...args) {
      const context = this;

      const later = function () {
        timeout = undefined;
        func.apply(context, args);
      };

      if (timeout !== undefined) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(later, wait);
    };
  }

  function handleScroll(event) {
    if (isScrolling) return;

    if (event.deltaY > 0) {
      currentIndex = Math.min(currentIndex + 1, elements.length - 1);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }

    elements[currentIndex].scrollIntoView({ behavior: "smooth" });

    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 200);
  }

  const debouncedScroll = debounce(handleScroll, 200);
  window.addEventListener("wheel", debouncedScroll);
}

// ts version current one
// export function initializeScrollHandling() {
//   const elements = Array.from(
//     document.querySelectorAll<HTMLElement>("section"),
//   );
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const windowWidth = window.innerWidth;
//       if (windowWidth <= 1024) {
//         enableScrolling();
//       } else {
//         handleIntersection(entry);
//       }
//     });
//   });

//   function handleIntersection(entry: IntersectionObserverEntry) {
//     if (entry.isIntersecting && entry.intersectionRatio === 1) {
//       enableScrolling();
//     } else {
//       disableScrolling();
//     }
//   }

//   function enableScrolling() {
//     document.body.style.overflowY = "auto";
//   }

//   function disableScrolling() {
//     if (!window.onwheel) {
//       document.body.style.overflowY = "hidden";
//     }
//   }

//   function handleWindowResize() {
//     const windowWidth = window.innerWidth;
//     if (windowWidth <= 1024) {
//       enableScrolling();
//       window.removeEventListener("wheel", debouncedAllSectionsScroll);
//     } else {
//       disableScrolling();
//       window.addEventListener("wheel", debouncedAllSectionsScroll);
//     }
//   }

//   window.addEventListener("resize", handleWindowResize);

//   elements.forEach((element) => {
//     observer.observe(element);
//   });

//   let currentIndex = 0;
//   let isScrolling = false;

//   function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (isScrolling) return;

//     if (event.deltaY > 0) {
//       currentIndex = Math.min(currentIndex + 1, elements.length - 1);
//     } else {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     elements[currentIndex].scrollIntoView({ behavior: "smooth" });

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);
//   }

//   const debouncedAllSectionsScroll = debounce(handleScroll, 200);

// const windowWidth = window.innerWidth;

// if (windowWidth <= 1024) {
//   enableScrolling();
//   window.removeEventListener("wheel", debouncedAllSectionsScroll);
// } else {
//   disableScrolling();
//   window.addEventListener("wheel", debouncedAllSectionsScroll);
// }
// window.addEventListener("wheel", debouncedAllSectionsScroll);
// }

// ts version 2
// export function initializeScrollHandling() {
//   const elements = Array.from(
//     document.querySelectorAll<HTMLElement>("section"),
//   );
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const windowWidth = window.innerWidth;
//       if (windowWidth <= 1024) {
//         enableScrolling();
//       } else {
//         handleIntersection(entry);
//       }
//     });
//   });

//   function handleIntersection(entry: IntersectionObserverEntry) {
//     if (entry.isIntersecting && entry.intersectionRatio === 1) {
//       enableScrolling();
//     } else {
//       disableScrolling();
//     }
//   }

//   function enableScrolling() {
//     document.body.style.overflowY = "auto";
//   }

//   function disableScrolling() {
//     if (!window.onwheel) {
//       document.body.style.overflowY = "hidden";
//     }
//   }

//   function handleWindowResize() {
//     const windowWidth = window.innerWidth;
//     if (windowWidth <= 1024) {
//       enableScrolling();
//       window.removeEventListener("wheel", debouncedScroll);
//     } else {
//       disableScrolling();
//       window.addEventListener("wheel", debouncedScroll);
//     }
//   }

//   window.addEventListener("resize", handleWindowResize);

//   elements.forEach((element) => {
//     observer.observe(element);
//   });

//   let currentIndex = 0;
//   let isScrolling = false;

//   function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (isScrolling) return;

//     const previousIndex = currentIndex; // Store the previous index

//     if (event.deltaY > 0) {
//       currentIndex = Math.min(currentIndex + 1, elements.length - 1);
//     } else {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     if (previousIndex !== currentIndex) {
//       console.log(`Scrolled to section ${currentIndex + 1}`);
//     }

//     elements[currentIndex].scrollIntoView({ behavior: "smooth" });

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);

//     if (currentIndex + 1 === 3) {
//       document.addEventListener(
//         "DOMContentLoaded",
//         initializeExperienceScrollHandling("start"),
//       );
//       console.log("started");
//     } else {
//       document.removeEventListener(
//         "DOMContentLoaded",
//         initializeExperienceScrollHandling("stop"),
//       );
//       console.log("stopped");
//     }
//   }

//   const debouncedScroll = debounce(handleScroll, 200);
//   window.addEventListener("wheel", debouncedScroll);
// }

// ts version 3
// export function initializeScrollHandling() {
//   const elements = Array.from(
//     document.querySelectorAll<HTMLElement>("section"),
//   );
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const windowWidth = window.innerWidth;
//       if (windowWidth <= 1024) {
//         enableScrolling();
//       } else {
//         handleIntersection(entry);
//       }
//     });
//   });

//   function handleIntersection(entry: IntersectionObserverEntry) {
//     if (entry.isIntersecting && entry.intersectionRatio === 1) {
//       enableScrolling();
//     } else {
//       disableScrolling();
//     }
//   }

//   function enableScrolling() {
//     document.body.style.overflowY = "auto";
//   }

//   function disableScrolling() {
//     if (!window.onwheel) {
//       document.body.style.overflowY = "hidden";
//     }
//   }

//   function handleWindowResize() {
//     const windowWidth = window.innerWidth;
//     if (windowWidth <= 1024) {
//       enableScrolling();
//       window.removeEventListener("wheel", debouncedScroll);
//     } else {
//       disableScrolling();
//       window.addEventListener("wheel", debouncedScroll);
//     }
//   }

//   window.addEventListener("resize", handleWindowResize);

//   elements.forEach((element) => {
//     observer.observe(element);
//   });

//   let currentIndex = 0;
//   let isScrolling = false;
//   let isExperienceScrollHandlingInitialized = false;

//   function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (...args: Parameters<T>) {
//       const later = function () {
//         timeout = undefined;
//         func.apply(null, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (isScrolling) return;

//     const previousIndex = currentIndex;

//     if (event.deltaY > 0) {
//       currentIndex = Math.min(currentIndex + 1, elements.length - 1);
//     } else {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     if (previousIndex !== currentIndex) {
//       console.log(`Scrolled to section ${currentIndex + 1}`);
//     }

//     elements[currentIndex].scrollIntoView({ behavior: "smooth" });

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);

//     if (currentIndex + 1 === 3) {
//       // if (!isExperienceScrollHandlingInitialized) {
//       //   document.addEventListener("DOMContentLoaded", () => {
//       //     initializeExperienceScrollHandling("start");
//       //     window.removeEventListener("wheel", debouncedScroll);
//       //   });
//       //   isExperienceScrollHandlingInitialized = true;
//       //   console.log("started");
//       // }
//       // document.addEventListener("wheel", () => {
//       //   initializeExperienceScrollHandling("start");
//       //   window.removeEventListener("wheel", debouncedScroll);
//       // });
//     } else {
//       // if (isExperienceScrollHandlingInitialized) {
//       //   document.addEventListener("DOMContentLoaded", () => {
//       //     initializeExperienceScrollHandling("stop");
//       //     window.addEventListener("wheel", debouncedScroll);
//       //   });
//       //   isExperienceScrollHandlingInitialized = false;
//       //   console.log("stopped");
//       // }
//     }
//   }

//   const debouncedScroll = debounce(handleScroll, 200);
//   window.addEventListener("wheel", debouncedScroll);
// }

// --------------------------------------------------------------

// handle scrolling in exp section

// export function handleDomContentLoad() {
//   const experienceSection = document.getElementById("experience");
//   const body = document.body; // Get the body element

//   const experienceSectionChilds =
//     document.querySelectorAll("#experience > div");

//   let currentIndex = 0;
//   let isScrolling = false;
//   let isOverflowDebouncing = false; // Add a flag to track overflow debounce
//   let scrolledElementsCount = 0;

//   function setOverflowHidden() {
//     body.style.overflowY = "hidden";
//   }

//   function setOverflowAuto() {
//     body.style.overflowY = "auto";
//   }

//   function isSectionFullyInView() {
//     const sectionRect = experienceSection.getBoundingClientRect();
//     return (
//       sectionRect.top >= 0 &&
//       sectionRect.bottom <=
//         (window.innerHeight || document.documentElement.clientHeight)
//     );
//   }

//   function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (!isSectionFullyInView()) return; // Only scroll when the section is fully in view

//     if (isScrolling) return;

//     if (event.deltaY > 0) {
//       currentIndex = Math.min(
//         currentIndex + 1,
//         experienceSectionChilds.length - 1,
//       );
//     } else if (event.deltaY < 0) {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     for (let i = 0; i < experienceSectionChilds.length; i++) {
//       const relativeIndex = i - currentIndex;
//       experienceSectionChilds[i].style.transform = `translateX(${
//         relativeIndex * 100
//       }vw)`;
//     }

//     scrolledElementsCount++;

//     // Check if all elements have been scrolled
//     if (scrolledElementsCount === experienceSectionChilds.length) {
//       setOverflowAuto(); // Restore overflowY to "auto"
//     } else {
//       setOverflowHidden();
//     }

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);
//   }

//   function checkSectionInViewAndOverflow() {
//     if (isSectionFullyInView()) {
//       setOverflowHidden();
//     } else {
//       body.style.overflowY = "auto";
//     }
//   }

//   const debouncedScroll = debounce(handleScroll, 200);
//   window.addEventListener("wheel", debouncedScroll);
//   window.addEventListener("scroll", checkSectionInViewAndOverflow);
// }

// refactor

// ts version
// export function initializeExperienceScrollHandling() {
//   const experienceSection = document.getElementById("experience");
//   const body = document.body; // Get the body element
//   const experienceSectionChilds =
//     document.querySelectorAll("#experience > div");

//   let currentIndex = 0;
//   let isScrolling = false;
//   let isOverflowDebouncing = false; // Add a flag to track overflow debounce
//   let scrolledElementsCount = 0;

//   function setOverflowHidden() {
//     body.style.overflowY = "hidden";
//   }

//   function setOverflowAuto() {
//     body.style.overflowY = "auto";
//   }

//   function isSectionFullyInView() {
//     const sectionRect = experienceSection?.getBoundingClientRect();
//     return (
//       sectionRect &&
//       sectionRect.top >= 0 &&
//       sectionRect.bottom <=
//         (window.innerHeight || document.documentElement.clientHeight)
//     );
//   }

//   function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (!isSectionFullyInView()) return; // Only scroll when the section is fully in view

//     if (isScrolling) return;

//     if (event.deltaY > 0) {
//       currentIndex = Math.min(
//         currentIndex + 1,
//         experienceSectionChilds.length - 1,
//       );
//     } else if (event.deltaY < 0) {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     for (let i = 0; i < experienceSectionChilds.length; i++) {
//       const relativeIndex = i - currentIndex;
//       experienceSectionChilds[i].style.transform = `translateX(${
//         relativeIndex * 100
//       }vw)`;
//     }

//     scrolledElementsCount++;
//     console.log(
//       "🚀 ~ file: index.ts:473 ~ handleScroll ~ scrolledElementsCount:",
//       scrolledElementsCount,
//     );
//     console.log(
//       "🚀 ~ file: index.ts:477 ~ handleScroll ~ experienceSectionChilds.length:",
//       experienceSectionChilds.length,
//     );

//     // Check if all elements have been scrolled
//     if (scrolledElementsCount === experienceSectionChilds.length) {
//       setOverflowAuto(); // Restore overflowY to "auto"
//     } else {
//       setOverflowHidden();
//     }

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);
//   }

//   function checkSectionInViewAndOverflow() {
//     if (isSectionFullyInView()) {
//       setOverflowHidden();
//     } else {
//       body.style.overflowY = "auto";
//     }
//   }

//   const debouncedScroll = debounce(handleScroll, 200);
//   window.addEventListener("wheel", debouncedScroll);
//   window.addEventListener("scroll", checkSectionInViewAndOverflow);
// }

// new version current one
// export function initializeExperienceScrollHandling() {
//   const experienceSection = document.getElementById("experience");
//   const body = document.body; // Get the body element
//   const experienceSectionChilds =
//     document.querySelectorAll("#experience > div");

//   let currentIndex = 0;
//   let isScrolling = false;
//   let isOverflowDebouncing = false; // Add a flag to track overflow debounce
//   let scrolledElementsCount = 0;
//   let previousScrollDirection = 0;

//   function setOverflowHidden() {
//     body.style.overflowY = "hidden";
//   }

//   function setOverflowAuto() {
//     body.style.overflowY = "auto";
//   }

//   function isSectionFullyInView() {
//     const sectionRect = experienceSection?.getBoundingClientRect();
//     return (
//       sectionRect &&
//       sectionRect.top >= 0 &&
//       sectionRect.bottom <=
//         (window.innerHeight || document.documentElement.clientHeight)
//     );
//   }

//   function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (!isSectionFullyInView()) return; // Only scroll when the section is fully in view

//     if (isScrolling) return;

//     const currentScrollDirection = Math.sign(event.deltaY);

//     if (currentScrollDirection !== previousScrollDirection) {
//       // Scrolling direction has changed, reset the count
//       scrolledElementsCount = 0;
//     }

//     if (currentScrollDirection > 0) {
//       // Scrolling down
//       currentIndex = Math.min(
//         currentIndex + 1,
//         experienceSectionChilds.length - 1,
//       );
//     } else if (currentScrollDirection < 0) {
//       // Scrolling up
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     for (let i = 0; i < experienceSectionChilds.length; i++) {
//       const relativeIndex = i - currentIndex;
//       experienceSectionChilds[i].style.transform = `translateX(${
//         relativeIndex * 100
//       }vw)`;
//     }

//     scrolledElementsCount++;
//     console.log(
//       "🚀 ~ file: index.ts:592 ~ handleScroll ~ scrolledElementsCount:",
//       scrolledElementsCount,
//     );
//     console.log(
//       "🚀 ~ file: index.ts:593 ~ handleScroll ~ experienceSectionChilds.length:",
//       experienceSectionChilds.length,
//     );

//     // Check if all elements have been scrolled
//     if (scrolledElementsCount === experienceSectionChilds.length) {
//       setOverflowAuto(); // Restore overflowY to "auto"
//     } else {
//       setOverflowHidden();
//     }

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);

//     previousScrollDirection = currentScrollDirection;
//   }

//   function checkSectionInViewAndOverflow() {
//     if (isSectionFullyInView()) {
//       setOverflowHidden();
//     } else {
//       body.style.overflowY = "auto";
//     }
//   }

//   const debouncedExperienceSectionScroll = debounce(handleScroll, 200); // Adjust the debounce time as needed
//   window.addEventListener("wheel", debouncedExperienceSectionScroll);
//   window.addEventListener("scroll", checkSectionInViewAndOverflow);
// }

// new version 2
// export function initializeExperienceScrollHandling(action: "start" | "stop") {
//   const experienceSection = document.getElementById("experience");
//   const body = document.body; // Get the body element
//   const experienceSectionChilds =
//     document.querySelectorAll("#experience > div");

//   let currentIndex = 0;
//   let isScrolling = false;
//   let isOverflowDebouncing = false; // Add a flag to track overflow debounce
//   let scrolledElementsCount = 0;
//   let previousScrollDirection = 0;

//   function setOverflowHidden() {
//     body.style.overflowY = "hidden";
//   }

//   function setOverflowAuto() {
//     body.style.overflowY = "auto";
//   }

//   function isSectionFullyInView() {
//     const sectionRect = experienceSection?.getBoundingClientRect();
//     return (
//       sectionRect &&
//       sectionRect.top >= 0 &&
//       sectionRect.bottom <=
//         (window.innerHeight || document.documentElement.clientHeight)
//     );
//   }

//   function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (!isSectionFullyInView()) return; // Only scroll when the section is fully in view

//     if (isScrolling) return;

//     const currentScrollDirection = Math.sign(event.deltaY);

//     if (currentScrollDirection !== previousScrollDirection) {
//       // Scrolling direction has changed, reset the count
//       scrolledElementsCount = 0;
//     }

//     if (currentScrollDirection > 0) {
//       // Scrolling down
//       currentIndex = Math.min(
//         currentIndex + 1,
//         experienceSectionChilds.length - 1,
//       );
//     } else if (currentScrollDirection < 0) {
//       // Scrolling up
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     for (let i = 0; i < experienceSectionChilds.length; i++) {
//       const relativeIndex = i - currentIndex;
//       experienceSectionChilds[i].style.transform = `translateX(${
//         relativeIndex * 100
//       }vw)`;
//     }

//     scrolledElementsCount++;
//     console.log(
//       "🚀 ~ file: index.ts:592 ~ handleScroll ~ scrolledElementsCount:",
//       scrolledElementsCount,
//     );
//     console.log(
//       "🚀 ~ file: index.ts:593 ~ handleScroll ~ experienceSectionChilds.length:",
//       experienceSectionChilds.length,
//     );

//     // Check if all elements have been scrolled
//     if (scrolledElementsCount === experienceSectionChilds.length) {
//       setOverflowAuto(); // Restore overflowY to "auto"
//     } else {
//       setOverflowHidden();
//     }

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 500);

//     previousScrollDirection = currentScrollDirection;
//   }

//   function checkSectionInViewAndOverflow() {
//     if (isSectionFullyInView()) {
//       setOverflowHidden();
//     } else {
//       body.style.overflowY = "auto";
//     }
//   }

//   const debouncedExperienceScroll = debounce(handleScroll, 200); // Adjust the debounce time as needed

//   if (action === "start") {
//     window.addEventListener("wheel", debouncedExperienceScroll);
//     window.addEventListener("scroll", checkSectionInViewAndOverflow);
//   }

//   if (action === "stop") {
//     window.removeEventListener("wheel", debouncedExperienceScroll);
//     window.removeEventListener("scroll", checkSectionInViewAndOverflow);
//   }
//   // window.addEventListener("wheel", debouncedExperienceScroll);
//   // window.addEventListener("scroll", checkSectionInViewAndOverflow);
// }

// To use this function, import it in your main script:
// import { initializeExperienceScrollHandling } from "./yourScriptFileName";

// Then, call the function when needed:
// document.addEventListener("DOMContentLoaded", initializeExperienceScrollHandling);

// -----------------------------------------------------------

// togheter

// ts
// Function 1: Scroll Handling
// let isExperienceFunctionActive = false;
// export function initializeScrollHandling() {
//   if (!isExperienceFunctionActive) {
//     const elements = Array.from(
//       document.querySelectorAll<HTMLElement>("section"),
//     );
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         const windowWidth = window.innerWidth;
//         if (windowWidth <= 1024) {
//           enableScrolling();
//         } else {
//           handleIntersection(entry);
//         }
//       });
//     });

//     function handleIntersection(entry: IntersectionObserverEntry) {
//       if (entry.isIntersecting && entry.intersectionRatio === 1) {
//         enableScrolling();
//       } else {
//         disableScrolling();
//       }
//     }

//     function enableScrolling() {
//       document.body.style.overflowY = "auto";
//     }

//     function disableScrolling() {
//       if (!window.onwheel) {
//         document.body.style.overflowY = "hidden";
//       }
//     }

//     function handleWindowResize() {
//       const windowWidth = window.innerWidth;
//       if (windowWidth <= 1024) {
//         enableScrolling();
//         window.removeEventListener("wheel", debouncedScroll);
//       } else {
//         disableScrolling();
//         window.addEventListener("wheel", debouncedScroll);
//       }
//     }

//     window.addEventListener("resize", handleWindowResize);

//     elements.forEach((element) => {
//       observer.observe(element);
//     });

//     let currentIndex = 0;
//     let isScrolling = false;

//     function debounce<T extends (...args: any[]) => any>(
//       func: T,
//       wait: number,
//     ) {
//       let timeout: NodeJS.Timeout | undefined;

//       return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//         const context: ThisParameterType<T> = this;

//         const later = function () {
//           timeout = undefined;
//           func.apply(context, args);
//         };

//         if (timeout !== undefined) {
//           clearTimeout(timeout);
//         }

//         timeout = setTimeout(later, wait);
//       };
//     }

//     function handleScroll(event: WheelEvent) {
//       if (isScrolling) return;

//       if (event.deltaY > 0) {
//         currentIndex = Math.min(currentIndex + 1, elements.length - 1);
//       } else {
//         currentIndex = Math.max(currentIndex - 1, 0);
//       }

//       if (currentIndex === 2) {
//         isExperienceFunctionActive = true;
//         window.removeEventListener("wheel", debouncedScroll);
//         initializeExperienceScrollHandling();
//       }

//       elements[currentIndex].scrollIntoView({ behavior: "smooth" });

//       isScrolling = true;
//       setTimeout(() => {
//         isScrolling = false;
//       }, 200);
//     }

//     const debouncedScroll = debounce(handleScroll, 200);
//     window.addEventListener("wheel", debouncedScroll);
//   }
// }

// // Function 2: Experience Scroll Handling
// function initializeExperienceScrollHandling() {
//   const experienceSection = document.getElementById("experience");
//   const body = document.body;
//   const experienceSectionChilds =
//     document.querySelectorAll("#experience > div");

//   let currentIndex = 0;
//   let isScrolling = false;
//   let isOverflowDebouncing = false;
//   let scrolledElementsCount = 0;
//   let previousScrollDirection = 0;

//   function setOverflowHidden() {
//     body.style.overflowY = "hidden";
//   }

//   function setOverflowAuto() {
//     body.style.overflowY = "auto";
//   }

//   function isSectionFullyInView() {
//     const sectionRect = experienceSection?.getBoundingClientRect();
//     return (
//       sectionRect &&
//       sectionRect.top >= 0 &&
//       sectionRect.bottom <=
//         (window.innerHeight || document.documentElement.clientHeight)
//     );
//   }

//   function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
//     let timeout: NodeJS.Timeout | undefined;

//     return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//       const context: ThisParameterType<T> = this;

//       const later = function () {
//         timeout = undefined;
//         func.apply(context, args);
//       };

//       if (timeout !== undefined) {
//         clearTimeout(timeout);
//       }

//       timeout = setTimeout(later, wait);
//     };
//   }

//   function handleScroll(event: WheelEvent) {
//     if (!isSectionFullyInView()) return;

//     if (isScrolling) return;

//     const currentScrollDirection = Math.sign(event.deltaY);

//     if (currentScrollDirection !== previousScrollDirection) {
//       scrolledElementsCount = 0;
//     }

//     if (currentScrollDirection > 0) {
//       currentIndex = Math.min(
//         currentIndex + 1,
//         experienceSectionChilds.length - 1,
//       );
//     } else if (currentScrollDirection < 0) {
//       currentIndex = Math.max(currentIndex - 1, 0);
//     }

//     for (let i = 0; i < experienceSectionChilds.length; i++) {
//       const relativeIndex = i - currentIndex;
//       experienceSectionChilds[i].style.transform = `translateX(${
//         relativeIndex * 100
//       }vw)`;
//     }

//     scrolledElementsCount++;

//     if (scrolledElementsCount === experienceSectionChilds.length) {
//       setOverflowAuto();
//       isExperienceFunctionActive = false;
//       window.removeEventListener("wheel", debouncedExperienceSectionScroll);
//       window.removeEventListener("scroll", checkSectionInViewAndOverflow);
//       initializeScrollHandling();
//     } else {
//       setOverflowHidden();
//     }

//     isScrolling = true;
//     setTimeout(() => {
//       isScrolling = false;
//     }, 200);

//     previousScrollDirection = currentScrollDirection;
//   }

//   function checkSectionInViewAndOverflow() {
//     if (isSectionFullyInView()) {
//       setOverflowHidden();
//     } else {
//       body.style.overflowY = "auto";
//     }
//   }

//   const debouncedExperienceSectionScroll = debounce(handleScroll, 200);
//   window.addEventListener("wheel", debouncedExperienceSectionScroll);
//   window.addEventListener("scroll", checkSectionInViewAndOverflow);
// }

// // Call the initial setup
// initializeScrollHandling();

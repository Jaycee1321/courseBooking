<!-- When creating a new VueJS component, it must consist of 3 blocks, template, script and style. -->
<!-- When naming a component, it must consist of two words and preferably in PascalCase -->
<!-- Each SFC block consists of HTML-like tags that encapsulates the block. They can be in any order. -->
<template>
    <div class="row mb-5 py-5" id="banner">
      <div class="col-md-10 p-5 ms-5">
        <h1 class="mb-3" id="banner-title">{{bannerProps.title}}</h1>
        <p class="mb-5" id="motto">{{bannerProps.tagline}}</p>
        <router-link class="btn btn-primary btn-lg rounded-pill px-3" :to="{ name: bannerProps.destination }">{{bannerProps.buttonLabel}} <i class="bi bi-arrow-right"></i></router-link>
      </div>
    </div>
</template>

<script>
  //export default allows us to define the components registration and its properties using Options API or Composition API. 
  //Options API was first used in VueJS Development and is mostly used for smaller scaled applications. Composition API was added in Vue 3.
  //Defining the props property using the Options API will allow components to be completely resuable. It will allow us to pass data from a parent component to a child component.
  export default {
    //props property is from the Options API that allow us to define the props that can be passed to a component
    props: {
      //When defining the props of a component, add the name of the props and its data type.
      //VueJS will check the data type of the value passed as a prop to this component.
      //We will replace the hardcoded text in our template to details/data passed from the parent.
      // title: String,
      // tagline: String
      bannerProps: Object
    },
    //mounted() method can be added which is a function/method that will run when the component is mounted.
    //A component is mounted when it is displayed and updated into the DOM
    mounted(){
      //You can log the props received by a component by accessing this.<propName>
      console.log(this.title);
      console.log(this.tagline);
    }
  }
</script>
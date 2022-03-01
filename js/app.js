var app = new Vue({
    el: "#signup",
    data: {
     newMember:{name:'',lastName:'',email:'',phone:''},
     members:[]
    },

    mounted : function(){
      this.fetchMembers();
    },

    methods:{
      keymonitor:function(event){
        if(event.key == "Enter"){
          alert("enter keyboard press")
        }
      },

      insertMember:function() {
        var memberForm = app.toFormData(app.newMember);
        axios.post('action.php?action=add',memberForm)
        .then(function(response){
          console.log(response);
        });
      },


      toFormData: function(obj) {
        var form_data = new FormData();
        for(var key in obj ){
          form_data.append(key, obj[key]);
        }
        return form_data;
      }     
      ,

      fetchMembers: function(){
        axios.post('action.php')
        .then(function(response){
          console.log(response);
          app.members = response.data.members;
        });
      },
    }

  });

  window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
 
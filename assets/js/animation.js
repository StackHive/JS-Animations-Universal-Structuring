//Create an Object to store animation details for different kind of animations.
//Here I only have scroll event but you can easily extend it to add any of the event types like click, hover etc.
var Animations = {
    'dance-animation':
  	{
      	trigger: "scroll",
        targetElementSelector:'.animate',
        initial: {
            css: {
                x: 0,
                y: 0,
                opacity: 0,
              	color:'white',
              	rotate:'0deg',
            },
            duration: 500
        },
        steps: [
          {
            css: {
                x: -100,
                y: 100,
                opacity: 1,
              	color:'rgb(5, 239, 249)',
                rotate:'-45deg',
            },duration: 500
        	},
          {
            css: {
                x: 0,
                y: 0,
                opacity: 1,
              	color:'rgb(5, 255, 84)',
              rotate:'0deg',
            },duration: 500
          },
          {
            css: {
                x: 100,
                y: 100,
                opacity: 1,
              	color:'rgb(255, 227, 113)',
              rotate:'45deg',
            },duration: 500
          },
          {
            css: {
                x: 0,
                y: 0,
                opacity: 1,
              	color:'white',
              rotate:'0deg',
            },duration: 500
          }],
      	repeatsteps:10
    },
    'slide-animation-fromtop': 
    {
        trigger: "scroll",
        targetElementSelector:'.animate',
        initial: {
            css: {
                x: 0,
                y: -150,
                opacity: 0
            },
            duration: 1000
        },
        steps: [{
            css: {
                x: 0,
                y: 0,
                opacity: 1
            },
            duration: 1000
        }]

    }, 
    'slide-animation-frombottom' : {
        trigger: "scroll",
        targetElementSelector:'.animate',
        initial: {
            css: {
                x: 0,
                y: 150,
                opacity: 0
            },
            duration: 1100
        },
        steps: [{
            css: {
                x: 0,
                y: 0,
                opacity: 1
            },
            duration: 1100
        }]

    }, 
    'slide-animation-fromleft' : 
    {
        trigger: "scroll",
        targetElementSelector:'.animate',
        initial: {
            css: {
                x: -150,
                y: 0,
                opacity: 0
            },
            duration: 1200
        },
        steps: [{
            css: {
                x: 0,
                y: 0,
                opacity: 1
            },
            duration: 1200
        }]

    }, 
    'slide-animation-fromright' :  {
        trigger: "scroll",
        targetElementSelector:'.animate',
        initial: {
            css: {
                x: 150,
                y: 0,
                opacity: 0
            },
            duration: 1300
        },
        steps: [{
            css: {
                x: 0,
                y: 0,
                opacity: 1
            },
            duration: 1300
        }]

    }, 
    'slide-animation-fromtopleft':  
    {
        trigger: "scroll",
        targetElementSelector:'.animate',
        initial: {
            css: {
                x: -250,
                y: -350,
                opacity: 0
            },
            duration: 1400
        },
        steps: [{
            css: {
                x: 0,
                y: 0,
                opacity: 1
            },
            duration: 1400
        }]

    }, 
    'slide-animation-fromtopright' : 
      {
        trigger: "scroll",
        targetElementSelector:'.animate',
        initial: {
            css: {
                x: 250,
                y: -350,
                opacity: 0
            },
            duration: 1500
        },
        steps: [{
            css: {
                x: 0,
                y: 0,
                opacity: 1
            },
            duration: 1500
        }]

    }
};

var applyAnimation = function($target,animationsteps)
{
 		for(var i=0;i<animationsteps.length;i++)
    {
      var step = animationsteps[i];
      $target.transition(step.css,step.duration);
    }
}
var attachScrollAnimation = function($element,animationObj)
{	
  		var offset = animationObj.offset || '20%';
      var repeat = animationObj.repeatsteps || 1;
      console.log(offset);
  		$element.waypoint({
          handler: function(direction) 
          {
              var $target = $element.find(animationObj.targetElementSelector);
              if(direction == "down")
              {
                  for(i=0;i<repeat;i++)
                	applyAnimation($target,animationObj.steps)
              }
              else
              {
                applyAnimation($target,[animationObj.initial]);
              }
         },
         offset:offset// you can pass in offset from the object as well!
      });
}

//data attribute to detect animation elements
// I am using data-sh-animate for that
$("[data-sh-animate]").each(function() 
{
    var animation = $(this).attr('data-sh-animate');

    //apply initial states to all elements
  	var $target = $(this).find(Animations[animation].targetElementSelector);
    $target.transition(Animations[animation].initial.css,0);

    switch(Animations[animation].trigger)
    {
      case "scroll":
        attachScrollAnimation($(this),Animations[animation])
        break;
    }
});
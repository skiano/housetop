housetop
========

This is not ready for use



base example

    var house = housetop();

    house.base([
      {w:300,h:300}
    ])
    .top([
      {w:200,h:300}, 
      {w:200,h:300}
    ])
    .left([
      {w:200,h:300}
    ])
    .bottom([
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300}
    ])

    house.render(1030, 10); // returns the final sizes


Separating the supply and the planning

    var house = housetop();

    house.supply([
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300}
    ]).plan([
      ['base', 1],
      ['top', 2],
      ['left', 1],
      ['bottom', 4]
    ]);

    house.render(1030, 10); // returns the final sizes

Mixing approaches 

    var house = housetop();

    house.supply([
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300},
      {w:200,h:300}
    ]).plan([
      ['base', {w:200,h:300}],
      ['top', 2],
      ['left', 1],
      ['bottom', 4]
    ]);

    house.render(1030, 10); // returns the final sizes


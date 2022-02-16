export const completeTweetsConfig = [
    {
    "label": "Tweet ID",
    "name": "Tweet ID",
    "availableOperators": ["equal","less","more"],
    "valueEditor": {
      "component": <input type="number"/>,
    }
  }, 
  {
    "label": "Original ID",
    "name": "Original ID",
    "availableOperators": ["equal"],
    "valueEditor": {
      "component": <input type="number"/>,
    }
  }, 
  {
    "label": "Tweet Content",
    "name": "Tweet Content",
    "availableOperators": ["contain"],
    "valueEditor": {
      "component": <input type="text"/>,
    },    
  },
  {
    "label": "Tweet Created",
    "name": "Tweet Created",
    "availableOperators": ["equal","more","less"],
    "valueEditor": {
      "component": <input type="datetime-local"/>,
    },    
  },
  {
    "label": "Annotators EID",
    "name": "Annotators EID",
    "availableOperators": ["equal"],
    "valueEditor": {
      "component": <input type="number"/>,
    },    
  },
  {
    "label": "Claim",
    "name": "Claim",
    "availableOperators": ["contain"],
    "valueEditor": {
      "component": <input type="text"/>,
    },    
  },
  {
    "label": "Stance",
    "name": "Stance",
    "availableOperators": ["contain"],
    "valueEditor": {
      "component": <input type="text"/>,
    },    
  },
  {
    "label": "Validated Time",
    "name": "Validated Time",
    "availableOperators": ["more","less","equal"],
    "valueEditor": {
      "component": <input type="datetime-local"/>,
    },    
  },
];

export const skippedTweetsConfig = [
  {
  "label": "Tweet ID",
  "name": "Tweet ID",
  "availableOperators": ["equal","less","more"],
  "valueEditor": {
    "component": <input type="number"/>,
  }
  }, 
  {
    "label": "Original ID",
    "name": "Original ID",
    "availableOperators": ["equal"],
    "valueEditor": {
      "component": <input type="number"/>,
    }
  },
  {
    "label": "Tweet Content",
    "name": "Tweet Content",
    "availableOperators": ["contain"],
    "valueEditor": {
      "component": <input type="text"/>,
    },    
  },
  {
    "label": "Tweet Created",
    "name": "Tweet Created",
    "availableOperators": ["equal","more","less"],
    "valueEditor": {
      "component": <input type="datetime-local"/>,
    },    
  },
  {
    "label": "Annotators EID",
    "name": "Annotators EID",
    "availableOperators": ["equal","null","not-null"],
    "valueEditor": {
      "component": <input type="number"/>,
    },    
  }   
];

export const IncompleteTweetsConfig = [
  {
  "label": "Tweet ID",
  "name": "Tweet ID",
  "availableOperators": ["equal","less","more"],
  "valueEditor": {
    "component": <input type="number"/>,
  }
  }, 
  {
    "label": "Original ID",
    "name": "Original ID",
    "availableOperators": ["equal"],
    "valueEditor": {
      "component": <input type="number"/>,
    }
  },
  {
    "label": "Tweet Content",
    "name": "Tweet Content",
    "availableOperators": ["contain"],
    "valueEditor": {
      "component": <input type="text"/>,
    },    
  },
  {
    "label": "Tweet Created",
    "name": "Tweet Created",
    "availableOperators": ["equal","more","less"],
    "valueEditor": {
      "component": <input type="datetime-local"/>,
    },    
  },
  {
    "label": "Annotators EID",
    "name": "Annotators EID",
    "availableOperators": ["equal","null","not-null"],
    "valueEditor": {
      "component": <input type="number"/>,
    },    
  }   
];
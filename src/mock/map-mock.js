import Mock from 'mockjs';

Mock.mock(/\/eump\/equipment\/city\/stats/, function(opts){
	var method = opts.type;
	if(method == "GET"){
		var info =  Mock.mock({
    		"status_code": 0,
    		"msg": "ok",
    		"data": {
		        "content": [
			      {
			        "name": "北京",
			        "dev_num": 1000,
			        "status": "normal"
			      },
			      {
			        "name": "武汉",
			        "dev_num": 100,
			        "status": "abnormal"
			      },
			      {
			        "name": "上海",
			        "dev_num": 200,
			        "status": "offline"			        
			      },
			      {
			        "name": "杭州",
			        "dev_num": 310,
			        "status": "normal"			        
			      },
			      {
			        "name": "深圳",
			        "dev_num": 150,
			        "status": "normal"			        
			      },
			      {
			        "name": "广州",
			        "dev_num": 30,
			        "status": "normal"			        
			      }
			    ]
    		}
		})
		return info
	} 
})

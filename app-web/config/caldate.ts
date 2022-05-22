
export function getDate(date) {
    let result='';
    try {
        var  _exp = Date.parse(date);
        let ts=new Date(Date.now()-_exp);
        if(ts.getUTCDay()-1<1)
        {
            if(ts.getUTCMinutes()<60){
                if (ts.getUTCMinutes() < 2)
                {
                    return "now";
                }
                else
                {
                    result=`${ts.getUTCMinutes()} minutes ago`;
                }
            }else{
                if(ts.getUTCHours()===1)
                    result=`1 hour ago`;
                else
                    result=`${ts.getUTCHours()} hours ago`;
            }
        }
        else if (ts.getUTCDay()-1 < 2)
        {
            result=`Yesterday`;
        }
        else
        {
            result=`${ts.getUTCDay()-1} days ago`;
        }
        return result;
    } 
    catch (e) 
    {
      return result;
    }
  }
export default getDate;
import java.text.SimpleDateFormat;
import java.util.Date;
class CoverageID {
    private String coverageID;
    public CoverageID(String coverageID){
        this.coverageID=coverageID;
    }
    public void affiche(){
        System.out.println("je suis le CoverageID : "+ this.coverageID);
    }
    public String getStringDate(){
        int index=this.coverageID.indexOf("___");
        String rep=this.coverageID.substring(index+3,index+23);
        rep=rep.replace(".",":");
        return rep;
    }
    public Date getDate() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        Date rep = sdf.parse(this.getStringDate());
        return rep;
    }
    public long getTSInMiliDate() throws Exception {
        return (this.getDate().getTime());
    }
    public boolean isFutur() throws Exception {
        long now=new Date().getTime();
        if (now <= this.getTSInMiliDate()) {
            return true;
        }
        else {
            return false;
        }
    }
    public String getName(){
        int index=this.coverageID.indexOf("___");
        return (this.coverageID.substring(0,index));
    }
    public String getSuffixe(){
        int index=this.coverageID.indexOf("___");
        return (this.coverageID.substring(index+23,coverageID.length()));
    }
}
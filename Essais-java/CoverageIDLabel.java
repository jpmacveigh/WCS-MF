import java.text.SimpleDateFormat;
import java.text.FieldPosition;
import java.util.Date;
class CoverageIDLabel{
    private String coverageIDLabel;
    public CoverageIDLabel (String coverageIDLabel){
        this.coverageIDLabel=coverageIDLabel;
    }public void affiche(){
        System.out.println("je suis le coverageIDLabel : "+ this.coverageIDLabel);
    }
    public String getCoverageIDLabel(){
        return this.coverageIDLabel;
    }
    public String getStringDate(){
        int index=this.coverageIDLabel.indexOf("___");
        String rep=this.coverageIDLabel.substring(index+3,index+23);
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
    public String getDateDeLaPrevision (long echeanceSecondes) throws Exception {  // calcul la date de prevision mise au format "yyyy-MM-dd'T'HH:mm:ss'Z'" 
        long TSPrevision=this.getTSInMiliDate()+echeanceSecondes*1000;
        Date datePrevision=new Date(TSPrevision);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        StringBuffer strb =new StringBuffer();
        sdf.format(datePrevision,strb,new FieldPosition(0));
        return (strb.toString());
    }
    public double getAge() throws Exception {  // calcul l'age en heure
       long now=new Date().getTime();
       double age=(now-this.getTSInMiliDate())/1000./3600.;
       return (age);
    }
    public boolean isFutur() throws Exception {
        if (this.getAge() <= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    public String getName(){
        int index=this.coverageIDLabel.indexOf("___");
        return (this.coverageIDLabel.substring(0,index));
    }
    public String getSuffixe(){
        int index=this.coverageIDLabel.indexOf("___");
        return (this.coverageIDLabel.substring(index+23,coverageIDLabel.length()));
    }
}
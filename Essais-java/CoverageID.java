import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.HashMap;
import java.util.Set;
class CoverageID {
    private String coverageID;
    private String resolution;  // "0025" ou "001"
    private String describedCoverage;
    private HashMap <String,String[]> lesCoordonnees=new HashMap<String,String[]>();
    private ArrayList<String> lesPathsPourGetCoverage =new ArrayList<String>();
    public CoverageID(String coverageID,String resolution) throws Exception{
        this.coverageID=coverageID;
        this.resolution=resolution;
        this.describedCoverage=this.getDescribedCoverage();
        this.construireLesAxes();
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
    public String getDescribeCoveragePath(){
        String model="MF-NWP-HIGHRES-AROME-"+this.resolution+"-FRANCE-WCS";
        String path="https://geoservices.meteofrance.fr/services/"+model+"?SERVICE=WCS&version=2.0.1&REQUEST=DescribeCoverage&CoverageId=";
        path=path+this.coverageID+"&token=__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__"; 
        return (path); 
    }
    private String getDescribedCoverage() throws Exception {
        String xml = GetUrl.get(this.getDescribeCoveragePath());
        return (xml);
    }
     private void construireLesAxes() throws Exception {
        String xml=this.describedCoverage;
        String tagAxes="<gml:axisLabels>";
        String tagFinAxes="</gml:axisLabels>";
        Pattern p = Pattern.compile(tagAxes+".+"+tagFinAxes);
		Matcher m = p.matcher(xml);
		ArrayList<String> lesAxes=new ArrayList<String>();
		while(m.find()) {
			System.out.println("\nrecherche nom des axes : "+m.group());
			String trouv=m.group();
			trouv=trouv.replace(tagAxes,"");
			trouv=trouv.replace(tagFinAxes,"");
			trouv=trouv.replace("  "," ");
			String[] lesAxesBruts = trouv.split(" ");
			for (int i=1;i<=lesAxesBruts.length-2;i++){
			    lesAxes.add(lesAxesBruts[i+1]);
			}
			System.out.println(lesAxes.size());
			for (String axe:lesAxes){
	            System.out.println(axe);
			}
		}
		String tagCoeff="<gmlrgrid:coefficients>";
        String tagFinCoeff="</gmlrgrid:coefficients>";
        p = Pattern.compile(tagCoeff+"(\\d+| )+"+tagFinCoeff);
		m = p.matcher(xml);
		int rang=0;
		while(m.find()) {
			System.out.println("\nrecherche coef : "+m.group());
			String trouv=m.group();
			trouv=trouv.replace(tagCoeff,"");
			trouv=trouv.replace(tagFinCoeff,"");
			String[] lesCoeff = trouv.split(" ");
			System.out.println(lesCoeff.length);
			for (String coeff:lesCoeff){
	            System.out.println(coeff);
			}
			this.lesCoordonnees.put(lesAxes.get(rang),lesCoeff);  // les coefficients indicés par les nom de l'axe
			rang=rang+1;
		}
    }
    public HashMap<String,String[]> getLesCoordonnees(){
        return this.lesCoordonnees;
    }
    public ArrayList<String> getLesPaths(){
        ArrayList<String> rep = new ArrayList<String>();
        int nbAxes=this.lesCoordonnees.size();
        Set<String> lesNomsDesAxes=this.lesCoordonnees.keySet();
        return rep;  // A terminer
    }
}
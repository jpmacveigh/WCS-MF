import java.util.HashMap;
import java.util.ArrayList;
class Toto {
    public static void main (String[] arg)throws Exception {
        String coverageIDLabel = "V_COMPONENT_OF_WIND__POTENTIAL_VORTICITY_SURFACE_2000___2017-08-25T12.00.00Z";
        //String coverageIDLabel="POTENTIAL_VORTICITY__ISOBARIC_SURFACE___2017-08-26T00.00.00Z";
        CoverageIDLabel label= new CoverageIDLabel(coverageIDLabel);
        label.affiche();
        System.out.println("mon nom : "+label.getName());
        System.out.println("ma date : "+label.getStringDate());
        System.out.println("mon suffixe : "+label.getSuffixe());
        System.out.println("mon TS en milisecondes : "+label.getTSInMiliDate());
        System.out.println("mon age (heures) : "+label.getAge());
        System.out.println("suis-je futur ? "+label.isFutur());
        long echeance=36000;
        System.out.println("echeance (sec) : "+echeance+" date prevision : "+label.getDateDeLaPrevision(echeance));
        CoverageID cov=new CoverageID(label,"0025");
        System.out.println(cov.getDescribeCoveragePath());
        HashMap<String,String[]> lesCoordonnees=cov.getLesCoordonnees();
        for (String key : lesCoordonnees.keySet()){
            System.out.println(key);
            System.out.println(lesCoordonnees.get(key).length);
            for (String coef : lesCoordonnees.get(key)){
                System.out.println(coef);    
            }
        }
        ArrayList<String> lesPaths=cov.getLesGetCoveragePaths();
        for (String path : lesPaths){
            System.out.println(path);
        }
        System.out.println("nb de paths calculés : "+lesPaths.size());
    }
}
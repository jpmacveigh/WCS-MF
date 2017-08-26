
class Toto {
    public static void main (String[] arg)throws Exception {
        String coverageID = "V_COMPONENT_OF_WIND__POTENTIAL_VORTICITY_SURFACE_2000___2017-08-26T12.00.00Z";
        CoverageID cov= new CoverageID(coverageID);
        cov.affiche();
        System.out.println("mon nom : "+cov.getName());
        System.out.println("ma date : "+cov.getStringDate());
        System.out.println("mon suffixe : "+cov.getSuffixe());
        System.out.println(cov.getDate().toString());
        System.out.println("mon TS en milisecondes : "+cov.getTSInMiliDate());
        System.out.println("suis-je futur ? "+cov.isFutur());
    }
}